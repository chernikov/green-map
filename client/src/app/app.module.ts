import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { MetaModule } from '@ngx-meta/core';

import { AppRoutingModule } from './app-routing.module';

import { IAppState, rootReducer, INITIAL_STATE } from '@store';

import { TOKEN_API_INJECTOR } from '@helpers/token-api-injector.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports:[
    HttpClientModule,
    NgReduxModule,
    SimpleNotificationsModule.forRoot(),
    MetaModule.forRoot(),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    CommonModule,
    NgtUniversalModule,
    AppRoutingModule
  ],
  providers: [
    TOKEN_API_INJECTOR
  ]
})
export class AppModule {
  constructor(
    _ngRedux:NgRedux<IAppState>,
    _devTools:DevToolsExtension
  ) {
    const storeEnhancers = _devTools.isEnabled() ? [ _devTools.enhancer() ] : [];
    _ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [],
      storeEnhancers);
  }
}