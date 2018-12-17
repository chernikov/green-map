import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { IAppState } from '@store';
import { NgRedux } from '@angular-redux/store';

import { RouterSlideAnimation } from '@animations';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [
    RouterSlideAnimation
  ]
})

export class DefaultComponent implements OnInit {

  constructor(
    private _ngRedux:NgRedux<IAppState>
  ) {
    
  }

  ngOnInit() {
    this.getMapConfigs();
    this.buildMap();
  }

  watchMapData() {
/*     this._activatedRoute.queryParams.subscribe(params => {
      if(this.map) {
        console.log(params['zoom']);
        this.map.setZoom(params['zoom']);
      }
    }); */
  }

  getMapConfigs() {
/*     this._ngRedux.select<MapConfig>('mapConfig').subscribe(data => {
      this.mapData = data;
      if(this.mapData) this.buildMap();
    }); */
  }

/*   getOutletDepth(outlet) {
    console.log(outlet.activatedRouteData['depth']);
    return outlet.activatedRouteData['depth'];
  } */

  buildMap() {
/*     if(this.isBrowser) {
      const mapProp = {
        center: new google.maps.LatLng(this.mapData.position.lat, this.mapData.position.lng),
        zoom: this.mapData.zoom,
        center: new google.maps.LatLng(48.909561, 24.705088),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
      this.patchMap();
    } */
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

  watchMapEvents() {
/*     google.maps.event.addListener(this.map, 'zoom_changed', () => {
      console.log(this.map.getZoom());
      //this.mapConfigs.zoom = this.map.getZoom()
    }); */
  }

}
