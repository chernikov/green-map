import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";

import { ProdApiUrl } from '@project-configs';

import { Setting } from '@classes/setting.class';
import { SettingResponse } from '@classes/setting-response.class';

const SETTING_KEY = makeStateKey('setting');

@Injectable({ providedIn: 'root' })
export class SettingService {
	private apiUrl:string = '/api/settings';
	private isServer:boolean;

  constructor(
		private _http:HttpClient,
		private _transferState:TransferState,
    @Inject(PLATFORM_ID) _platformId	
	) {
		this.isServer = isPlatformServer(_platformId);
	}

	get():Observable<Setting> {
		const settings:Setting = this._transferState.get(SETTING_KEY, null);

		if(!settings) {
      let url:string = this.isServer ? (ProdApiUrl + this.apiUrl) : this.apiUrl;
      return this._http.get(url).pipe(map(res => res ? Setting.fromJS(res) : null));
    } else {
      return Observable.create((observer:Observer<Setting>) => observer.next(settings));
    }
	}

  save(data:Setting):Observable<SettingResponse> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post<SettingResponse>(this.apiUrl, data, { headers });
	}
}