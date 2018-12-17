import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGalleryModule } from 'ngx-gallery';

import { RedirectToPolygonSubject } from './_core/subjects/redirect-to-polygon.subject';

import { DefaultRoutingModule } from './default-routing.module';

import { DefaultComponent } from './default.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './_components/map/map.component';
import { ZonesComponent } from './zones/zones.component';
import { ZoneDetailComponent } from './zone-detail/zone-detail.component';

@NgModule({
	imports:[
		CommonModule,
		DefaultRoutingModule,
		NgxGalleryModule
	],
	declarations: [
		DefaultComponent,
		AboutComponent,
		HomeComponent,
		MapComponent,
		ZonesComponent,
		ZoneDetailComponent
	],
	providers: [
		RedirectToPolygonSubject
	]
})

export class DefaultModule { }
