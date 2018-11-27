import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';

import { DefaultComponent } from './default.component';

@NgModule({
	imports:[
		CommonModule,
		DefaultRoutingModule
	],
	declarations: [
		DefaultComponent
	],
	providers: [ ]
})

export class DefaultModule { }
