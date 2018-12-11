import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './_components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './_components/admin-sidebar/admin-sidebar.component';
import { AdminMapComponent } from './admin-map/admin-map.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';

@NgModule({
    imports: [
        AdminRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        QuillModule
    ],
    declarations: [
        AdminComponent,
        AdminHeaderComponent,
        AdminSidebarComponent,
        AdminMapComponent,
        AdminSettingsComponent
    ],
    providers: [ ]
})

export class AdminModule { }