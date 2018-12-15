import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";

import { ProdApiUrl } from '@project-configs';

import { Map } from '@classes/map.class';
import { MapResponse } from '@classes/map-response.class';

const MAP_KEY = makeStateKey('map');

@Injectable({ providedIn: 'root' })
export class MapService {
	private apiUrl:string = '/api/map';
	private isServer:boolean;

	constructor(
		private _http:HttpClient,
		private _transferState:TransferState,
    	@Inject(PLATFORM_ID) _platformId	
	) {
		this.isServer = isPlatformServer(_platformId);
	}

	get():Observable<Map> {
		const mapData:Map = this._transferState.get(MAP_KEY, null);

		if(!mapData) {
    		let url:string = this.isServer ? (ProdApiUrl + this.apiUrl) : this.apiUrl;
			return this._http.get(url).pipe(map(res => res ? Map.fromJS(res) : null));
    	} else {
      		return Observable.create((observer:Observer<Map>) => observer.next(mapData));
    	}
	}

	save(data:Map):Observable<MapResponse> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post<MapResponse>(this.apiUrl, data, { headers });
	}
}