
/* 
import { IsAdminGuard } from '@guards/is-admin.guard';

import { AdminComponent } from './admin.component';
import { MapConfigsComponent } from './map-configs/map-configs.component';

export const router: Routes = [
    { path: '', component: AdminComponent, canActivateChild: [IsAdminGuard],
        children: [
            { path: 'map-configs', component: MapConfigsComponent }
        ]
    },
    { path: '**', redirectTo: '' }
]

export const AdminRoutes: ModuleWithProviders = RouterModule.forChild(router); */



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }