import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate, CanActivateChild } from '@angular/router';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@store';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '@classes/user.class';

@Injectable({ providedIn: 'root' })
export class IsAdminGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(
    private ngRedux:NgRedux<IAppState>,
    private router:Router
  ) { }
  
  canLoad():boolean {
    return this.process();
  }

  canActivate():boolean {
    return this.process();
  }

  canActivateChild():boolean {
    return this.process();
  }

  process():boolean {
    let token = this.ngRedux.getState().authToken;
    if(token) {
        let tokenHelper = new JwtHelperService();
        let userInfo = tokenHelper.decodeToken(token).user;
        let user = User.fromJS(JSON.parse(userInfo));
        if(!tokenHelper.isTokenExpired(token) && user.role.code === 'admin') return true;
    }

    this.router.navigateByUrl('/admin');
    return false;
  }
}