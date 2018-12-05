import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';

import { DefaultComponent } from './default.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	imports:[
		CommonModule,
		DefaultRoutingModule
	],
	declarations: [
		DefaultComponent,
		AboutComponent,
		HomeComponent
	],
	providers: [ ]
})

export class DefaultModule { }
