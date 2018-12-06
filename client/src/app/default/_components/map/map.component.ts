import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { IAppState } from '@store';
import { NgRedux } from '@angular-redux/store';

import { Map } from '@classes/map.class';

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
  mapData:Map;

  constructor(
    private _ngRedux:NgRedux<IAppState>,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    @Inject(PLATFORM_ID) _platformId
  ) { 
    this.isBrowser = isPlatformBrowser(_platformId);
  }

  ngOnInit() {
    this.getMapData();
  }

  getMapData() {
    this.mapData = { ...this._ngRedux.getState().map } as Map;
    console.log(this.mapData);
    this.buildMap();
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