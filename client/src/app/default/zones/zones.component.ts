import { Component, OnInit } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@store';

import { MapShapeItem } from '@classes/map-shape-item.class';

import { RedirectToPolygonSubject } from '../_core/subjects/redirect-to-polygon.subject';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})

export class ZonesComponent implements OnInit {
  mapShapes:MapShapeItem[];
  polygonDefaultSetup:any;

  constructor(
    private _ngRedux:NgRedux<IAppState>,
    private _redirectToPolygonSubject:RedirectToPolygonSubject
  ) {
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
    this.watchZonesChange();
  }
  
  watchZonesChange() {
    this._ngRedux.select<MapShapeItem[]>('mapShape').subscribe(data => {
      this.mapShapes = data;
    });
  }

  onSelectZone(id:string) {
    this._redirectToPolygonSubject.set(id);
  }
}