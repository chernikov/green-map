import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsAdminGuard } from '@guards/is-admin.guard';

import { AdminComponent } from './admin.component';
import { MapConfigsComponent } from './map-configs/map-configs.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    { path: '', component: AdminComponent/* , canActivateChild: [IsAdminGuard] */,
        children: [
            { path: 'map', component: MapConfigsComponent },
            { path: 'settings', component: SettingsComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }