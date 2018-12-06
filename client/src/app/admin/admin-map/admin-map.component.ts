import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationType } from 'angular2-notifications';

import { IAppState } from '@store';
import { NgRedux } from '@angular-redux/store';

import { MapAction } from '@global-reducers/map.reducer';

import { Coordinate } from '@classes/coordinate.class';
import { Map } from '@classes/map.class';
import { AppNotification } from '@classes/app-notification.class';

import { NotificationSubject } from '@subjects/notification.subject';

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.scss']
})
export class AdminMapComponent implements OnInit {
  @ViewChild('mapElement') mapElement:ElementRef;
  map:google.maps.Map;
  mapData:Map;

  form:FormGroup;










  
  mapDraw:google.maps.drawing.DrawingManager;
  selectedMapShape:any;
  allPolygons:any[];
  polygonDefaultSetup:any;
  isInProgress:boolean;
  newMapPosition:Coordinate;

  constructor(
    private _ngRedux:NgRedux<IAppState>,
    private _formBuilder:FormBuilder,
    private _notificationSubject:NotificationSubject
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
    this.getMapData();
    this.buildForm();
  }

  buildForm() {
    this.form = this._formBuilder.group({
      zoom: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required]
    });

    this.patchMapForm();
    this.watchForm();
  }

  getMapData() {
    this.mapData = { ...this._ngRedux.getState().map } as Map;
    this.buildMap();
    this.patchMapForm();
  }

  buildMap() {
    const mapProp = {
      center: new google.maps.LatLng(this.mapData.position.lat, this.mapData.position.lng),
      zoom: this.mapData.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      fullscreenControl: true,
      zoomControl: true,
      mapTypeControl: true
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
    this.watchMapEvents();
  
/*     this.addMapDraw();
    this.patchMap(); */
  }

  patchMapForm() {
    if(this.form && this.mapData) {
      this.form.patchValue({
        zoom: this.mapData.zoom,
        lat: Number((this.mapData.position.lat).toFixed(5)),
        lng: Number((this.mapData.position.lng).toFixed(5))
      });
    }
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

  watchForm() {
    this.form.valueChanges.subscribe(data => {

      if(data.zoom != this.mapData.zoom && data.zoom) {
        this.mapData.zoom = parseInt(data.zoom);
        this.map.setZoom(this.mapData.zoom);
      }

      if(data.lat != this.mapData.position.lat || data.lng != this.mapData.position.lng) {
        console.log('update');
        this.mapData.position.lat = Number(data.lat);
        this.mapData.position.lng = Number(data.lng);
        this.map.setCenter(new google.maps.LatLng(this.mapData.position.lat, this.mapData.position.lng));
      }
    });
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

    google.maps.event.addListener(this.map, 'dragend', () => {
      this.mapData.position = new Coordinate({
        lat: Number((this.map.getCenter().lat()).toFixed(5)),
        lng: Number((this.map.getCenter().lng()).toFixed(5))
      });

      if(this.form) {
        this.form.patchValue({
          lat: this.mapData.position.lat,
          lng: this.mapData.position.lng
        });
      }
    });

    google.maps.event.addListener(this.map, 'zoom_changed', () => {
      this.mapData.zoom = this.map.getZoom()
    
      if(this.form) {
        this.form.patchValue({
          zoom: this.mapData.zoom
        });
      }
    });
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

  onMapUpdate() {

  }

  onMapReset() {
    this.mapData = { ...this._ngRedux.getState().map } as Map;
    this.patchMapForm();
    console.log('on map reset');
    this.map.setZoom(Number(this.mapData.zoom));
    this.map.setCenter(new google.maps.LatLng(Number(this.mapData.position.lat), Number(this.mapData.position.lng)));
  }

  onDeleteSelectedShape() {
/*     if(this.selectedMapShape) {
      this.allPolygons = this.allPolygons.filter(p => p.id != this.selectedMapShape.id);
      this.selectedMapShape.setMap(null);
      this.selectedMapShape = null;
    } */
  }

  onCancel() {
    
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

/*   onCancel() {
    this.getMapConfigs();
  } */
}
