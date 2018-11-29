import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'angular2-notifications';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '@store';

import { AuthTokenAction } from '@global-reducers/auth-token.reducer';
import { AuthUserAction } from '@global-reducers/auth-user.reducer';
import { SettingAction } from '@global-reducers/setting.reducer';

import { SettingDispatch } from '@dispatch-classes/setting-dispatch.class';

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
    @Inject(PLATFORM_ID) _platformId
  ) {
    this.isBrowser = isPlatformBrowser(_platformId);
  }

  ngOnInit() {
    this.watchNotification();
    this.prebootData();
    this.checkAuth();
  }

  prebootData() {
    this._settingService.get().subscribe(data => {
      this._ngRedux.dispatch({ type: SettingAction.update, payload: data } as SettingDispatch);
    });
  }

  watchNotification() {
    this._notificationSubject.watch().subscribe(data => this._notificationsService.create(data.title, data.text, data.type));
  }

  checkAuth() {
    if(this.isBrowser) {
      let token = localStorage.getItem('authToken');

      if(token) {
        if(!tokenHelper.isTokenExpired(token)) {
            let decoded = tokenHelper.decodeToken(token);
            let user = User.fromJS(JSON.parse(decoded.user));

            this._ngRedux.dispatch({ type: AuthTokenAction.save, payload: token });
            this._ngRedux.dispatch({ type: AuthUserAction.save, payload: user });
        } else {
          this._ngRedux.dispatch({ type: AuthTokenAction.remove });
          this._ngRedux.dispatch({ type: AuthUserAction.remove });
        }
      }
    }
  }
}
