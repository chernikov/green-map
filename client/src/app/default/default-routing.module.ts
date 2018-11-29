import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes:Routes = [
  { path: '', component: DefaultComponent,
    children: [
      { path: '', data: { depth: 1 }, component: HomeComponent },
      { path: 'about', data: { depth: 2 }, component: AboutComponent },
      /* { path: '',
        redirectTo: '',
        pathMatch: 'full'
      }, */
      /* { path: '**', redirectTo: '' } */
    ]
  },
  /* { path: '**', redirectTo: '' } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DefaultRoutingModule { }