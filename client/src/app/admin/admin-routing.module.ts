import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsAdminGuard } from '@guards/is-admin.guard';

import { AdminComponent } from './admin.component';
import { AdminMapComponent } from './admin-map/admin-map.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { StabilityComponent } from './stability/stability.component';

const routes: Routes = [
    { path: '', component: AdminComponent, canActivateChild: [IsAdminGuard],
        children: [
            { path: 'map', component: AdminMapComponent },
            { path: 'settings', component: AdminSettingsComponent },
            { path: 'stability', component: StabilityComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }