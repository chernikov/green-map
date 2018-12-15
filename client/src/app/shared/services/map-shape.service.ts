import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";

import { ProdApiUrl } from '@project-configs';

import { MapShapeItem } from '@classes/map-shape-item.class';
import { MapShapeItemResponse } from '@classes/map-shape-item-response.class';

const MAP_SHAPE_KEY = makeStateKey('map-shape');

@Injectable({ providedIn: 'root' })
export class MapShapeService {
	private apiUrl:string = '/api/map-shape';
	private isServer:boolean;

	constructor(
		private _http:HttpClient,
		private _transferState:TransferState,
    	@Inject(PLATFORM_ID) _platformId	
	) {
		this.isServer = isPlatformServer(_platformId);
	}

	get():Observable<MapShapeItem[]> {
		const mapData:MapShapeItem[] = this._transferState.get(MAP_SHAPE_KEY, null);

		if(!mapData) {
    		let url:string = this.isServer ? (ProdApiUrl + this.apiUrl) : this.apiUrl;
    		return this._http.get(url).pipe(map((res:any) => res != null ? res.map(i => MapShapeItem.fromJS(i)) : null));
    	} else {
    		return Observable.create((observer:Observer<MapShapeItem[]>) => observer.next(mapData));
    	}
	}
  
	update(data:MapShapeItem):Observable<MapShapeItemResponse> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post<MapShapeItemResponse>(this.apiUrl, data, { headers });
	}

	delete(id:string):Observable<MapShapeItemResponse> {
		return this._http.delete<MapShapeItemResponse>(this.apiUrl + '/' + id).pipe(map(res => res != null ? MapShapeItemResponse.fromJS(res) : null));
	}
}