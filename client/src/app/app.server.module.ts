import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

@NgModule({
    bootstrap: [AppComponent],
    imports:[
        BrowserModule.withServerTransition({ appId: 'app-root' }),
        BrowserAnimationsModule,
        ServerModule,
        AppModule,
        ServerTransferStateModule,
        ModuleMapLoaderModule
    ]
})

export class AppServerModule {}