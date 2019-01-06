import { Component, OnInit } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@store';

import { User } from '@classes/user.class';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  user:User;

  constructor(
    private _ngRedux:NgRedux<IAppState>,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.user = this._ngRedux.getState().authUser;
  }
}
