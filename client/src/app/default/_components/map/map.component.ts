import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import * as signalR from '@aspnet/signalr';

import { IAppState } from '@store';
import { NgRedux } from '@angular-redux/store';

import { Map } from '@classes/map.class';
import { MapShapeItem } from '@classes/map-shape-item.class';
import { MapShapeAction } from '@global-reducers/map-shape.reducer';
import { MapShapeDispatch } from '@dispatch-classes/map-shape-dispatch.class';

import { RedirectToPolygonSubject } from '../../_core/subjects/redirect-to-polygon.subject';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapElement') mapElement:ElementRef;
  map:google.maps.Map;
  mapParams:any;
  isBrowser:boolean;
  mapData:Map;
  mapShapes:MapShapeItem[];
  polygonDefaultSetup:any;
  mapShapeConnection:any;
  allShapes:any[];

  constructor(
    private _ngRedux:NgRedux<IAppState>,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    private _redirectToPolygonSubject:RedirectToPolygonSubject,
    @Inject(PLATFORM_ID) _platformId
  ) { 
    this.isBrowser = isPlatformBrowser(_platformId);
    this.allShapes = [];
    this.polygonDefaultSetup = {
      strokeColor: '#0a3c03',
      strokeOpacity: 0.7,
      strokeWeight: 1,
      fillColor: '#0d7f20',
      fillOpacity: 0.5,
      clickable: true
    }
  }

  ngOnInit() {
    this.getMapData();
    this.getMapShapes();
    this.watchShapeUpdate();
    this.watchMapRedirect();
  }

  ngOnDestroy() {
    this.mapShapeConnection.stop();
  }

  getMapData() {
    this.mapData = { ...this._ngRedux.getState().map } as Map;
    this.buildMap();
  }

  watchMapRedirect() {
    this._redirectToPolygonSubject.watch().subscribe(shapeId => this.redirectToShape(shapeId));
  }

  redirectToShape(id:string) {
    let shape = this.mapShapes.find(i => i.id === id);
    if(shape) {
      let bounds = new google.maps.LatLngBounds();

      for(let i = 0; i < shape.coordinates.length; i++) {
        bounds.extend(new google.maps.LatLng(shape.coordinates[i].lat, shape.coordinates[i].lng));
      }
  
      this._router.navigate(["/zone-detail/" + shape.id], { queryParams: { zoom: this.getZoomByBounds(this.map, bounds), lat: bounds.getCenter().lat().toFixed(5), lng: bounds.getCenter().lng().toFixed(5) }});
    }
  }

  getZoomByBounds(map, bounds){
    let MAX_ZOOM = map.mapTypes.get(map.getMapTypeId()).maxZoom || 21;
    let MIN_ZOOM = map.mapTypes.get(map.getMapTypeId()).minZoom || 0;
  
    let ne = map.getProjection().fromLatLngToPoint(bounds.getNorthEast());
    let sw = map.getProjection().fromLatLngToPoint(bounds.getSouthWest()); 
  
    let worldCoordWidth = Math.abs(ne.x - sw.x);
    let worldCoordHeight = Math.abs(ne.y - sw.y);
  
    let FIT_PAD = 40;
  
    for(let zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom){ 
        if(worldCoordWidth * ( 1 << zoom) + 2 * FIT_PAD < this.mapElement.nativeElement.clientWidth && 
           worldCoordHeight * ( 1 << zoom ) + 2 * FIT_PAD < this.mapElement.nativeElement.clientHeight)
            return zoom;
    }
    return 0;
  }

  getMapShapes() {
    let data = this._ngRedux.getState().mapShape;
    this.mapShapes = data.map(i => new MapShapeItem(i));
    this.patchMap();
  }

  watchShapeUpdate() {
    this.mapShapeConnection = new signalR.HubConnectionBuilder().withUrl('/ws/map-shape').build();

    this.mapShapeConnection.start();

    this.mapShapeConnection.on("MapShapeChange", (type:string, data:MapShapeItem) => {
      if(type === "update") {
        this._ngRedux.dispatch({ type: MapShapeAction.update, payload: [data] } as MapShapeDispatch);
        let shape = this.allShapes.find(i => i.id === data.id);

        if(!shape) {
          let polygonObj = { ...this.polygonDefaultSetup };
          polygonObj.paths = data.coordinates;
          polygonObj.editable = false;
  
          let item = new google.maps.Polygon(polygonObj);
          item.set('id', data.id);
          item.set('title', data.title);
          item.set('description', data.description);
          item.set('images', data.images);
          this.allShapes.push(item);
  
          google.maps.event.addListener(item, 'click', (e) => {
            this.redirectToShape((<any>item).id);
          });
  
          item.setMap(this.map);
          this.mapShapes.push(data);
        } else {
          shape.setPaths(data.coordinates);
          shape.set('title', data.title);
          shape.set('description', data.description);
          shape.set('images', data.images);

          this.mapShapes = this.mapShapes.map(s => s.id != data.id ? s : data);
        }
      } else if(type === "delete") {
        this._ngRedux.dispatch({ type: MapShapeAction.remove, payload: [data] } as MapShapeDispatch);

        let shape = this.allShapes.find(i => i.id === data.id);
        this.allShapes = this.allShapes.filter(p => p.id != data.id);
        shape.setMap(null);
      }
    });
  }

  buildMap() {
    if(this.isBrowser) {
      const mapSetup = {
        center: new google.maps.LatLng(this.mapData.position.lat, this.mapData.position.lng),
        zoom: this.mapData.zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapSetup);
      this.watchMapData();
      this.watchMapEvents();
      this.patchMap();
    }
  }

  patchMap() {
    if(this.mapShapes && this.map) {
      let polygonObj = { ...this.polygonDefaultSetup };

      for(let i = 0; i < this.mapShapes.length; i++) {
        polygonObj.paths = this.mapShapes[i].coordinates;
        polygonObj.editable = false;

        let item = new google.maps.Polygon(polygonObj);
        item.set('id', this.mapShapes[i].id);
        item.set('title', this.mapShapes[i].title);
        item.set('description', this.mapShapes[i].description);
        item.set('images', this.mapShapes[i].images);
        this.allShapes.push(item);

        google.maps.event.addListener(item, 'click', (e) => {
          this.redirectToShape((<any>item).id);
        });

        item.setMap(this.map);
      }
    }
  }

  watchMapData() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.mapParams = params;
      if(this.isBrowser && this.map) {
        this.map.setZoom(Number(this.mapParams['zoom']));
        this.map.setCenter(new google.maps.LatLng(Number(this.mapParams['lat']), Number(this.mapParams['lng'])));
      }
    });
  }

  watchMapEvents() {
    if(this.isBrowser && this.map) {
      google.maps.event.addListener(this.map, 'zoom_changed', () => {
        this._router.navigate([window.location.pathname], { queryParams: { zoom: this.map.getZoom(), lat: this.mapParams['lat'], lng: this.mapParams['lng'] }});
      });

      google.maps.event.addListener(this.map, 'dragend', () => {
        this._router.navigate([window.location.pathname], { queryParams: { zoom: this.mapParams['zoom'], lat: Number((this.map.getCenter().lat()).toFixed(5)), lng: Number((this.map.getCenter().lng()).toFixed(5)) }});
      });
    }
  }
}