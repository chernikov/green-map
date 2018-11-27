import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/* import { AdminRoutes } from './admin.routing'; */
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
/* import { AdminHeaderComponent } from './_components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './_components/admin-sidebar/admin-sidebar.component';
import { MapConfigsComponent } from './map-configs/map-configs.component'; */

@NgModule({
    imports: [
        AdminRoutingModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AdminComponent,
        /* AdminHeaderComponent,
        AdminSidebarComponent,
        MapConfigsComponent */
    ],
    providers: [ ]
})

export class AdminModule { }