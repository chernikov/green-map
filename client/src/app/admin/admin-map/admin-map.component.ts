import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { NotificationType } from 'angular2-notifications';
import * as signalR from '@aspnet/signalr';

import { IAppState } from '@store';
import { NgRedux } from '@angular-redux/store';

import { MapAction } from '@global-reducers/map.reducer';
import { MapShapeAction } from '@global-reducers/map-shape.reducer';

import { MapDispatch } from '@dispatch-classes/map-dispatch.class';
import { MapShapeDispatch } from '@dispatch-classes/map-shape-dispatch.class';

import { Coordinate } from '@classes/coordinate.class';
import { Map } from '@classes/map.class';
import { AppNotification } from '@classes/app-notification.class';
import { MapShapeItem } from '@classes/map-shape-item.class';

import { NotificationSubject } from '@subjects/notification.subject';

import { MapService } from '@services/map.service';
import { MapShapeService } from '@services/map-shape.service';
import { ShapeImageUploadService } from '@services/shape-image-upload.service';

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.scss']
})
export class AdminMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapElement') mapElement:ElementRef;
  map:google.maps.Map;
  mapDraw:google.maps.drawing.DrawingManager;
  mapData:Map;
  mapShapeConnection:any;

  form:FormGroup;
  shapeForm:FormGroup;

  selectedMapShape:any;
  allShapes:any[];
  polygonDefaultSetup:any;
  mapShapes:MapShapeItem[];

  constructor(
    private _ngRedux:NgRedux<IAppState>,
    private _formBuilder:FormBuilder,
    private _mapService:MapService,
    private _mapShapeService:MapShapeService,
    private _shapeImageUploadService:ShapeImageUploadService,
    private _notificationSubject:NotificationSubject
  ) {
    this.allShapes = [];
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
    this.getMapShapes();
    this.buildForm();
    this.buildShapeForm();
    this.watchShapeUpdate();
  }

  ngOnDestroy() {
    this.mapShapeConnection.stop();
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
            item.setEditable(true);
            this.setMapSelection(item);
          });

        } else {
          shape.setPaths(data.coordinates);
          shape.set('title', data.title);
          shape.set('description', data.description);
          shape.set('images', data.images);

          if(this.selectedMapShape.id === data.id) this.patchShapeForm(); 
        }
      } else if(type === "delete") {
        this._ngRedux.dispatch({ type: MapShapeAction.remove, payload: [data] } as MapShapeDispatch);

        let shape = this.allShapes.find(i => i.id === data.id);
        this.allShapes = this.allShapes.filter(p => p.id != data.id);
        shape.setMap(null);
        this.selectedMapShape = null;
      }
    });
  }

  buildShapeForm() {
    this.shapeForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      images: this._formBuilder.array([])
    });
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

  getMapShapes() {
    let data = this._ngRedux.getState().mapShape;
    this.mapShapes = data.map(i => new MapShapeItem(i));
    this.patchMap();
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
    this.addMapDraw();
    this.watchMapEvents();
    this.patchMap();
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

  patchShapeForm() {
    if(this.shapeForm && this.selectedMapShape) {
      this.shapeForm.patchValue({
        title: this.selectedMapShape.title,
        description: this.selectedMapShape.description
      });

      this.shapeForm.setControl('images', this._formBuilder.array(this.selectedMapShape.images || []));

      this.watchShapeForm();
    }
  }

  addMapDraw() {
    let polygonOptions = this.polygonDefaultSetup;
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

    this.mapDraw.setMap(this.map);
  }

  watchForm() {
    this.form.valueChanges.subscribe(data => {

      if(data.zoom != this.mapData.zoom && data.zoom) {
        this.mapData.zoom = parseInt(data.zoom);
        this.map.setZoom(this.mapData.zoom);
      }

      if(data.lat != this.mapData.position.lat || data.lng != this.mapData.position.lng) {
        this.mapData.position.lat = Number(data.lat);
        this.mapData.position.lng = Number(data.lng);
        this.map.setCenter(new google.maps.LatLng(this.mapData.position.lat, this.mapData.position.lng));
      }
    });
  }

  watchShapeForm() {
    this.shapeForm.valueChanges.subscribe(data => {
      if(this.selectedMapShape) {
        this.selectedMapShape.title = data.title;
        this.selectedMapShape.description = data.description;
        //this.selectedMapShape.images = data.images;
      }
    });
  }

  watchMapEvents() {
    google.maps.event.addListener(this.mapDraw, 'overlaycomplete', (e) => {
      let newShape = e.overlay;
      newShape.type = e.type;

      newShape.set('id', new Date().valueOf());
      newShape.set('title', '');
      newShape.set('description', '');

      this.allShapes.push(newShape);

      if (e.type !== google.maps.drawing.OverlayType.MARKER) {
        this.mapDraw.setDrawingMode(null);
        google.maps.event.addListener(newShape, 'click', (e) => {
          newShape.setEditable(true);
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
            this.setMapSelection(newShape);
        });
        this.setMapSelection(newShape);
      }
    });

    google.maps.event.addListener(this.mapDraw, "drawingmode_changed", () => this.clearMapSelection());
    google.maps.event.addListener(this.map, 'click', () => this.clearMapSelection());

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
    if(this.mapShapes && this.map) {
      let polygonObj = { ...this.polygonDefaultSetup };

      for(let i = 0; i < this.mapShapes.length; i++) {
        polygonObj.paths = this.mapShapes[i].coordinates;
        polygonObj.editable = false;

        let item = new google.maps.Polygon(polygonObj);
        item.set('id', (this.mapShapes[i].id.length > 20 ? this.mapShapes[i].id : (new Date().valueOf()) + i));
        item.set('title', this.mapShapes[i].title);
        item.set('description', this.mapShapes[i].description);
        item.set('images', this.mapShapes[i].images)
        this.allShapes.push(item);

        google.maps.event.addListener(item, 'click', (e) => {
          item.setEditable(true);
          this.setMapSelection(item);
        });

        item.setMap(this.map);
      }
    }
  }

  collectShapeData() {
    let path = this.selectedMapShape.getPath();
    let polygonCoordinates:Coordinate[] = [];

    for(let i = 0; i < path.getLength(); i++) {
      let xy = path.getAt(i);
      polygonCoordinates.push(new Coordinate({ lat: xy.lat(), lng: xy.lng() }));
    }

    let data = new MapShapeItem({
      id: this.selectedMapShape.id.length > 20 ? this.selectedMapShape.id : null,
      title: this.selectedMapShape.title,
      description: this.selectedMapShape.description,
      coordinates: polygonCoordinates,
      images: this.shapeForm.value.images
    })

    return data;
  }

  clearMapSelection() {
    if(this.selectedMapShape) {
      if(this.selectedMapShape.type !== 'marker') this.selectedMapShape.setEditable(false);
      this.selectedMapShape = null;
      this.shapeForm.reset();
    }
  }

  setMapSelection(shape) {
    if(shape.type !== 'marker') {
      this.clearMapSelection();
      shape.setEditable(true);
    }

    this.selectedMapShape = shape;
    this.patchShapeForm();
  }

  onSelectImages(event) {
    let files = event.srcElement.files;
    let images = <FormArray>this.shapeForm.controls['images'];

    for(let file of files) images.push(new FormControl(file));
  }

  onMapReset() {
    this.mapData = { ...this._ngRedux.getState().map } as Map;
    this.patchMapForm();
    this.map.setZoom(Number(this.mapData.zoom));
    this.map.setCenter(new google.maps.LatLng(Number(this.mapData.position.lat), Number(this.mapData.position.lng)));
  }

  onDeleteShapeImage(index:number) {
    let images = <FormArray>this.shapeForm.controls['images'];
    images.removeAt(index);
  }

  onUpdateMap() {
    this._mapService.save(this.mapData).subscribe(res => {
      if(res.isSuccess) this._ngRedux.dispatch({ type: MapAction.update, payload: res.result } as MapDispatch);

      let notification = new AppNotification({
        type: res.isSuccess ? NotificationType.Success : NotificationType.Error,
        title: res.isSuccess ? 'Success' : 'Error',
        text: res.isSuccess ? 'Settings updated' : 'Please try later'
      });

      this._notificationSubject.create(notification);
    });
  }

  onDeleteSelectedShape() {
    if(this.selectedMapShape) {
      this.allShapes = this.allShapes.filter(p => p.id != this.selectedMapShape.id);
      this.selectedMapShape.setMap(null);
      this.selectedMapShape = null;
    }
  }

  onUpdateShape() {
    let data = this.collectShapeData();

    if(data.images && data.images.length) {
      let needSaveImages = [];

      for(let image of data.images) {
        if(<any>image instanceof File) needSaveImages.push(image);
      }

      this._shapeImageUploadService.upload(needSaveImages).subscribe(res => {
        if(res.isSuccess) {
          let count = 0;
          for(let i = 0; i < data.images.length; i++) {
            if(<any>data.images[i] instanceof File) {
              data.images[i] = res.result[count];
              count++;
            }
          }
        }
        this.saveShape(data);
      });
    } else {
      this.saveShape(data);
    }
  }

  saveShape(data:MapShapeItem) {
    this._mapShapeService.update(data).subscribe(res => {
      if(res.isSuccess && data.id === null) this.selectedMapShape.set('id', res.result.id);

      let notification = new AppNotification({
        type: res.isSuccess ? NotificationType.Success : NotificationType.Error,
        title: res.isSuccess ? 'Success' : 'Error',
        text: res.isSuccess ? 'Map shape updated' : 'Please try later'
      });

      this._notificationSubject.create(notification);
    });
  }

  onDeleteShape() {
    this._mapShapeService.delete(this.selectedMapShape.id).subscribe(res => {
      let notification = new AppNotification({
        type: res.isSuccess ? NotificationType.Success : NotificationType.Error,
        title: res.isSuccess ? 'Success' : 'Error',
        text: res.isSuccess ? 'Map shape removed' : 'Please try later'
      });

      this._notificationSubject.create(notification);
    });
  }

  onResetShape() {
    let data = this.mapShapes.find(i => i.id === this.selectedMapShape.id);
    this.selectedMapShape.setPaths(data.coordinates);
    this.selectedMapShape.set('title', data.title);
    this.selectedMapShape.set('description', data.description);
    this.selectedMapShape.set('images', data.images);
    this.patchShapeForm();
  }
}