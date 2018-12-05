import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgRedux } from '@angular-redux/store';

import { IAppState } from '@store';

import { AuthTokenAction } from '@global-reducers/auth-token.reducer';
import { AuthUserAction } from '@global-reducers/auth-user.reducer';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(
    private router:Router,
    private ngRedux: NgRedux<IAppState>,
  ) { }

  ngOnInit() { }

  onLogout() {
    this.ngRedux.dispatch({ type: AuthTokenAction.remove });
    this.ngRedux.dispatch({ type: AuthUserAction.remove });
    this.router.navigateByUrl('');
  }
}
