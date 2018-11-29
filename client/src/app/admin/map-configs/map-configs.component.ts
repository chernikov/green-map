import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationType } from 'angular2-notifications';

import { IAppState } from '@store';
import { NgRedux } from '@angular-redux/store';

import { MapConfigAction } from '@global-reducers/map.reducer';

import { MapShape } from '@classes/map-shape.class';
import { MapData } from '@classes/map-data.class';
import { Coordinate } from '@classes/coordinate.class';
import { MapConfig } from '@classes/map-config.class';
import { AppNotification } from '@classes/app-notification.class';

import { NotificationSubject } from '@subjects/notification.subject';

import { MapConfigService } from '@services/map.service';

@Component({
  selector: 'app-map-configs',
  templateUrl: './map-configs.component.html',
  styleUrls: ['./map-configs.component.scss']
})

export class MapConfigsComponent implements OnInit {
  @ViewChild('mapElement') mapElement:ElementRef;
  mapConfigs:MapConfig;
  map:google.maps.Map;
  mapDraw:google.maps.drawing.DrawingManager;
  selectedMapShape:any;
  allPolygons:any[];
  polygonDefaultSetup:any;
  isInProgress:boolean;
  newMapPosition:Coordinate;

  constructor(
    private ngRedux:NgRedux<IAppState>,
    private mapConfigService:MapConfigService,
    private notificationSubject:NotificationSubject
  ) {
    this.isInProgress = false;
    this.allPolygons = [];
    this.polygonDefaultSetup = {
      strokeColor: '#0a3c03',
      strokeOpacity: 0.7,
      strokeWeight: 1,
      fillColor: '#0d7f20',
      fillOpacity: 0.5,
      clickable: true,
      draggable: true
    }
  }

  ngOnInit() {
    this.getMapConfigs();
  }

  getMapConfigs() {
    this.mapConfigs = { ...this.ngRedux.getState().mapConfig } as MapConfig;
    this.buildMap();
  }

  buildMap() {
/*     const mapProp = {
      center: new google.maps.LatLng(this.mapConfigs.position.lat, this.mapConfigs.position.lng),
      zoom: this.mapConfigs.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      fullscreenControl: true,
      zoomControl: true,
      mapTypeControl: true
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
  
    this.addMapDraw();
    this.watchMapEvents();
    this.patchMap(); */
  }

  addMapDraw() {
/*     let polygonOptions = this.polygonDefaultSetup;
    polygonOptions.editable = true;

    this.mapDraw = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      map: this.map,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      },
      polygonOptions: polygonOptions
    });

    this.mapDraw.setMap(this.map); */
  }

  watchMapEvents() {
/*     google.maps.event.addListener(this.mapDraw, 'overlaycomplete', (e) => {
      let newShape = e.overlay;
      newShape.type = e.type;
      newShape.set('id', new Date().valueOf());
      this.allPolygons.push(newShape);

      if (e.type !== google.maps.drawing.OverlayType.MARKER) {
        this.mapDraw.setDrawingMode(null);
        google.maps.event.addListener(newShape, 'click', (e) => {
          newShape.setEditable(true); */
/*             if (e.vertex !== undefined) {
                if (newShape.type === google.maps.drawing.OverlayType.POLYGON) {
                    var path = newShape.getPaths().getAt(e.path);
                    path.removeAt(e.vertex);
                    if (path.length < 3) {
                        newShape.setMap(null);
                    }
                }
                if (newShape.type === google.maps.drawing.OverlayType.POLYLINE) {
                    var path = newShape.getPath();
                    path.removeAt(e.vertex);
                    if (path.length < 2) {
                        newShape.setMap(null);
                    }
                }
            } */
/*             this.setMapSelection(newShape);
        });
        this.setMapSelection(newShape);
      }
    });

    google.maps.event.addListener(this.mapDraw, "drawingmode_changed", () => this.clearMapSelection());
    google.maps.event.addListener(this.map, 'click', () => this.clearMapSelection());

    google.maps.event.addListener(this.map, 'dragend', () => {
      this.newMapPosition = new Coordinate({
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      });
    });

    google.maps.event.addListener(this.map, 'zoom_changed', () => this.mapConfigs.zoom = this.map.getZoom()); */
  }

  patchMap() {
/*     if(this.mapConfigs && this.mapConfigs.data) {
      if(this.mapConfigs.data.polygon && this.mapConfigs.data.polygon.length) {
        let polygonObj = { ...this.polygonDefaultSetup };

        for(let i = 0; i < this.mapConfigs.data.polygon.length; i++) {
          polygonObj.paths = this.mapConfigs.data.polygon[i].coordinate;
          polygonObj.editable = false;

          let item = new google.maps.Polygon(polygonObj);
          item.set('id', (new Date().valueOf()) + i);
          this.allPolygons.push(item);

          google.maps.event.addListener(item, 'click', (e) => {
            item.setEditable(true);
            this.setMapSelection(item);
          });

          item.setMap(this.map);
        }
      }
    } */
  }

  collectData() {
/*     if(this.newMapPosition) this.mapConfigs.position = this.newMapPosition;

    let data = new MapData({
      polygon: []
    });

    for(let polygon of this.allPolygons) {
      let path = polygon.getPath();
      let polygonCoordinat:Coordinate[] = [];

      for(let i = 0; i < path.getLength(); i++) {
        let xy = path.getAt(i);
        polygonCoordinat.push(new Coordinate({ lat: xy.lat(), lng: xy.lng() }));
      }

      data.polygon.push(new MapShape({ coordinate: polygonCoordinat }));
    }

    this.mapConfigs.data = data; */
  }

  clearMapSelection() {
/*     if(this.selectedMapShape) {
      if(this.selectedMapShape.type !== 'marker') this.selectedMapShape.setEditable(false);
      this.selectedMapShape = null;
    } */
  }

  setMapSelection(shape) {
/*     if(shape.type !== 'marker') {
      this.clearMapSelection();
      shape.setEditable(true);
    }

    this.selectedMapShape = shape; */
  }

  onDeleteSelectedShape() {
/*     if(this.selectedMapShape) {
      this.allPolygons = this.allPolygons.filter(p => p.id != this.selectedMapShape.id);
      this.selectedMapShape.setMap(null);
      this.selectedMapShape = null;
    } */
  }

  onUpdate() {
/*     this.isInProgress = true;
    this.collectData();

    this.mapConfigService.save(this.mapConfigs).subscribe(res => {
      this.isInProgress = false;
      if(res.isSuccess) {
        this.allPolygons = [];
        this.selectedMapShape = null;
        this.ngRedux.dispatch({ type: MapConfigAction.update, payload: res.result });
        this.getMapConfigs();
      }
      let notification = new AppNotification({
        type: res.isSuccess ? NotificationType.Success : NotificationType.Error,
        title: res.isSuccess ? 'Success' : 'Error',
        text: res.isSuccess ? 'Map updated' : 'Please try later'
      });
      this.notificationSubject.create(notification);
    }); */
  }

  onCancel() {
    this.getMapConfigs();
  }
}