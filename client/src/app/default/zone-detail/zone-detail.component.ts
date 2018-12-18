import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';


import { MapShapeItem } from '@classes/map-shape-item.class';

import { MetaService } from '@ngx-meta/core';

import { IAppState } from '@store';
import { NgRedux } from '@angular-redux/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zone-detail',
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.scss']
})

export class ZoneDetailComponent implements OnInit {
  currentShapeId:string;
  currentShape:MapShapeItem;
  allShapes:MapShapeItem[];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private _ngRedux:NgRedux<IAppState>,
    private _activatedRoute:ActivatedRoute,
    private _metaService:MetaService
  ) {
    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];
  this.galleryImages = [];
  }

  ngOnInit() {
    this.getRouterData();
    this.watchZonesChange();
  }

  getRouterData() {
    this._activatedRoute.params.subscribe(params => {
      this.currentShapeId = params['id'];
      this.getCurrentShape();
    });
  }

  watchZonesChange() {
    this._ngRedux.select<MapShapeItem[]>('mapShape').subscribe(data => {
      this.allShapes = data;
      this.getCurrentShape();
    });
  }

  getCurrentShape() {
    if(this.currentShapeId && this.allShapes && this.allShapes.length) {
      this.currentShape = this.allShapes.find(s => s.id === this.currentShapeId);
      this.galleryImages = [];
      if(this.currentShape && this.currentShape.images && this.currentShape.images.length) {
        for(let image of this.currentShape.images) {
          this.galleryImages.push(new NgxGalleryImage({
            small: image,
            medium: image,
            big: image
          }));
        }
      }
      this.setMetaTegs();
    }
  }

  setMetaTegs() {
    if(this.currentShape) {
      this._metaService.setTitle(this.currentShape.title);
      this._metaService.setTag('description', this.currentShape.description);
    }
  }
}
