import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { IAppState } from '@store';
import { NgRedux } from '@angular-redux/store';

import { RouterSlideAnimation } from '@animations';

import { MapConfig } from '@classes/map-config.class';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [
    RouterSlideAnimation
  ]
})

export class DefaultComponent implements OnInit {
  @ViewChild('mapElement') mapElement:ElementRef;
  map:google.maps.Map;
  mapData:MapConfig;
  isBrowser:boolean;

  constructor(
    private _ngRedux:NgRedux<IAppState>,
    @Inject(PLATFORM_ID) _platformId
  ) {
    this.isBrowser = isPlatformBrowser(_platformId);
  }

  ngOnInit() {
    this.getMapConfigs();
    this.buildMap();
  }

  getMapConfigs() {
    this._ngRedux.select<MapConfig>('mapConfig').subscribe(data => {
      this.mapData = data;
      if(this.mapData) this.buildMap();
    });
  }

  getOutletDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }

  buildMap() {
    if(this.isBrowser) {
      const mapProp = {
        /* center: new google.maps.LatLng(this.mapData.position.lat, this.mapData.position.lng),
        zoom: this.mapData.zoom, */
        center: new google.maps.LatLng(48.909561, 24.705088),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
      this.patchMap();
    }
  }

  patchMap() {
/*     if(this.mapData && this.mapData.data && this.mapData.data.polygon && this.mapData.data.polygon.length) {
      for(let polygon of this.mapData.data.polygon) {
  
        let item = new google.maps.Polygon({
          paths: polygon.coordinate,
          strokeColor: '#0a3c03',
          strokeOpacity: 0.7,
          strokeWeight: 1,
          fillColor: '#0d7f20',
          fillOpacity: 0.5,
          clickable: false,
          draggable: false,
          editable: false
        });
        
        item.setMap(this.map);
      }
    } */
  }

}
