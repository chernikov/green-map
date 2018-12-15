import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

import { NgRedux } from '@angular-redux/store';

import { IAppState } from '@store';

import { AuthTokenAction } from '@global-reducers/auth-token.reducer';
import { AuthUserAction } from '@global-reducers/auth-user.reducer';

import { AuthTokenDispatch } from '@dispatch-classes/auth-token-dispatch.class';
import { AuthUserDispatch } from '@dispatch-classes/auth-user.dispatch.class';

import { User } from '@classes/user.class';
import { Login } from '@classes/login.class';
import { Map } from '@classes/map.class';

import { LoginService } from '@services/login.service';

const tokenHelper = new JwtHelperService();

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  form:FormGroup;
  authUser:User;
  formErrors:string[];
  mapData:Map;

  constructor(
    private _formBuilder:FormBuilder,
    private _ngRedux:NgRedux<IAppState>,
    private _loginService:LoginService,
    private _router:Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getUser();
    this.getQueryParams();
  }

  getUser() {
    this._ngRedux.select<User>('authUser').subscribe(data => {
      this.authUser = data;
      if(this.authUser) this._router.navigateByUrl('/admin/map');
    });
  }

  buildForm() {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  getQueryParams() {
    this.mapData = this._ngRedux.getState().map;
  }

  onCancel() {
    this._router.navigate(['/'], { queryParams: { zoom: this.mapData.zoom, lat: this.mapData.position.lat, lng: this.mapData.position.lng } });
  }

  onLogin() {
    this.formErrors = [];
    if(this.form.valid) {
      let data = new Login({
        email: this.form.value.email,
        password: this.form.value.password,
        isPersistent: true
      });

      this._loginService.login(data).subscribe(res => {
        if(res.isSuccess) {
          let decoded = tokenHelper.decodeToken(res.result);
          let user = User.fromJS(JSON.parse(decoded.user));

          this._ngRedux.dispatch({ type: AuthTokenAction.save, payload: res.result } as AuthTokenDispatch);
          this._ngRedux.dispatch({ type: AuthUserAction.save, payload: user } as AuthUserDispatch);
          this._router.navigateByUrl('/admin/map');
        } else {
          this.formErrors = res.errors;
        }
        this.form.reset();
      });
    }
  }
}