import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';

import { WsUrls } from '@project-configs';

import { StabilityItem } from '@classes/stability-item.class';

import { StabilityService } from '@services/stability.service';
import { InvalidApiService } from '@services/invalid-api.service';

@Component({
  selector: 'app-stability',
  templateUrl: './stability.component.html',
  styleUrls: ['./stability.component.scss']
})

export class StabilityComponent implements OnInit {
  stabilityConnection:any;
  stability:StabilityItem[];

  constructor(
    private _stabilityService:StabilityService,
    private _invalidApiService:InvalidApiService
  ) { }

  ngOnInit() {
    this.getStability();
    this.watchStabilityUpdate();
  }

  getStability() {
    this._stabilityService.get().subscribe(data => this.stability = data);
  }

  watchStabilityUpdate() {
    this.stabilityConnection = new signalR.HubConnectionBuilder().withUrl(WsUrls.stability).build();

    this.stabilityConnection.start();

    this.stabilityConnection.on("StabilityChange", (type:string, data:StabilityItem) => {
      this.stability && this.stability.length ? this.stability.push(data) : this.stability = [data];
    });
  }

  createAppError() {
    let item;
    item.length;
  }

  createApiError() {
    this._invalidApiService.post().subscribe();
  }

  createApiErrorWithData() {
    this._invalidApiService.post({testing: "testing api with data"}).subscribe();
  }
}