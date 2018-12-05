import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './_components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './_components/admin-sidebar/admin-sidebar.component';
import { MapConfigsComponent } from './map-configs/map-configs.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
    imports: [
        AdminRoutingModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AdminComponent,
        AdminHeaderComponent,
        AdminSidebarComponent,
        MapConfigsComponent,
        SettingsComponent
    ],
    providers: [ ]
})

export class AdminModule { }