import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ZonesComponent } from './zones/zones.component';
import { ZoneDetailComponent } from './zone-detail/zone-detail.component';

const routes:Routes = [
  { path: '', component: DefaultComponent,
    children: [
      { path: '', data: { depth: 1 }, component: HomeComponent },
      { path: 'about', data: { depth: 2 }, component: AboutComponent },
      { path: 'zones', data: { depth: 3 }, component: ZonesComponent },
      { path: 'zone-detail/:id', data: { depth: 4 }, component: ZoneDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DefaultRoutingModule { }