import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgRedux } from '@angular-redux/store';

import { IAppState } from '@store';

import { AuthTokenAction } from '@global-reducers/auth-token.reducer';
import { AuthUserAction } from '@global-reducers/auth-user.reducer';

import { Map } from '@classes/map.class';
import { User } from '@classes/user.class';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})

export class AdminHeaderComponent implements OnInit {
  mapData:Map;
  user:User;

  constructor(
    private _router:Router,
    private _ngRedux:NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this.getQueryParams();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.user = this._ngRedux.getState().authUser;
  }

  getQueryParams() {
    this.mapData = this._ngRedux.getState().map;
  }

  onLogout() {
    this._ngRedux.dispatch({ type: AuthTokenAction.remove });
    this._ngRedux.dispatch({ type: AuthUserAction.remove });
    this._router.navigate(['/'], { queryParams: { zoom: this.mapData.zoom, lat: this.mapData.position.lat, lng: this.mapData.position.lng } });
  }
}
