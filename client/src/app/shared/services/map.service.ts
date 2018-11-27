import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { MapConfig } from '@classes/map-config.class';
import { MapConfigResponse } from '@classes/map-config-response.class';

@Injectable({ providedIn: 'root' })
export class MapConfigService {
	private apiUrl:string = 'http://localhost:8080/api/map-config';
    constructor(private http: HttpClient) {}

	get():Observable<MapConfig> {
		return this.http.get(this.apiUrl).pipe(map(res => res ? MapConfig.fromJS(res) : null));
	}

    save(data:MapConfig):Observable<MapConfigResponse> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this.http.post<MapConfigResponse>(this.apiUrl, data, { headers });
	}
}
