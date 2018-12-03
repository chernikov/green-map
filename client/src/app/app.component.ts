import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'angular2-notifications';
import { NgRedux } from '@angular-redux/store';
import { MetaService } from '@ngx-meta/core';

import { IAppState } from '@store';

import { AuthTokenAction } from '@global-reducers/auth-token.reducer';
import { AuthUserAction } from '@global-reducers/auth-user.reducer';
import { SettingAction } from '@global-reducers/setting.reducer';

import { SettingDispatch } from '@dispatch-classes/setting-dispatch.class';
import { AuthTokenDispatch } from '@dispatch-classes/auth-token-dispatch.class';
import { AuthUserDispatch } from '@dispatch-classes/auth-user.dispatch.class';

import { User } from '@classes/user.class';

import { NotificationSubject } from '@subjects/notification.subject';

import { SettingService } from '@services/setting.service';

const tokenHelper = new JwtHelperService();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isBrowser:boolean;
  notificationOptions = {
    showProgressBar: true,
    timeOut: 3400,
    lastOnBottom: true
  }

  constructor(
    private _ngRedux:NgRedux<IAppState>,
    private _notificationSubject:NotificationSubject,
    private _notificationsService:NotificationsService,
    private _settingService:SettingService,
    private _metaService:MetaService,
    @Inject(PLATFORM_ID) _platformId
  ) {
    this.isBrowser = isPlatformBrowser(_platformId);
  }

  ngOnInit() {
    this.watchNotification();
    this.prebootData();
    this.getAuth();
  }

  prebootData() {
    this._settingService.get().subscribe(data => {
      //this._metaService.setTitle(data);
      console.log(data);
      this._ngRedux.dispatch({ type: SettingAction.update, payload: data } as SettingDispatch);
    });
  }

  watchNotification() {
    this._notificationSubject.watch().subscribe(data => this._notificationsService.create(data.title, data.text, data.type));
  }

  getAuth() {
    if(this.isBrowser) {
      let token = localStorage.getItem('authToken');
      if(token) {
        this.checkAuth(token);
        setInterval(() => {
          if(tokenHelper.isTokenExpired(token)) {
            this._ngRedux.dispatch({ type: AuthTokenAction.remove } as AuthTokenDispatch);
            this._ngRedux.dispatch({ type: AuthUserAction.remove } as AuthUserDispatch);
          }
        }, 1500);
      }
    }
  }

  checkAuth(token:string) {
    if(!tokenHelper.isTokenExpired(token)) {
      let decoded = tokenHelper.decodeToken(token);
      let user = User.fromJS(JSON.parse(decoded.user));

      this._ngRedux.dispatch({ type: AuthTokenAction.save, payload: token } as AuthTokenDispatch);
      this._ngRedux.dispatch({ type: AuthUserAction.save, payload: user } as AuthUserDispatch);
    } else {
      this._ngRedux.dispatch({ type: AuthTokenAction.remove } as AuthTokenDispatch);
      this._ngRedux.dispatch({ type: AuthUserAction.remove } as AuthUserDispatch);
    }
  }
}