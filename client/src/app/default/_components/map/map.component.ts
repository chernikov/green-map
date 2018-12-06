import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  @ViewChild('mapElement') mapElement:ElementRef;
  map:google.maps.Map;
  mapParams:any;
  isBrowser:boolean;
  //mapData:MapConfig;

  constructor(
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    @Inject(PLATFORM_ID) _platformId
  ) { 
    this.isBrowser = isPlatformBrowser(_platformId);
  }

  ngOnInit() {
    this.buildMap();
    this.watchMapData();
    this.watchMapEvents();
  }

  buildMap() {
    if(this.isBrowser) {
      const mapSetup = {
        /* center: new google.maps.LatLng(this.mapData.position.lat, this.mapData.position.lng),
        zoom: this.mapData.zoom, */
        center: new google.maps.LatLng(48.909561, 24.705088),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapSetup);
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
        this._router.navigate(['/'], { queryParams: { zoom: this.map.getZoom(), lat: this.mapParams['lat'], lng: this.mapParams['lng'] }});
      });

      google.maps.event.addListener(this.map, 'dragend', () => {
        this._router.navigate(['/'], { queryParams: { zoom: this.mapParams['zoom'], lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() }});
      });
    }
  }
}