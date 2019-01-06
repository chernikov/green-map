import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { StabilityItem } from '@classes/stability-item.class';
import { StabilityItemResponse } from '@classes/stability-item-response.class';

@Injectable({ providedIn: 'root' })
export class StabilityService {
  private apiUrl:string = '/api/stability';
  constructor(private _http:HttpClient) {}

	get():Observable<StabilityItem[]> {
    return this._http.get(this.apiUrl).pipe(map((res:any) => res != null ? res.map(i => StabilityItem.fromJS(i)) : null));
	}

  save(data:StabilityItem):Observable<StabilityItemResponse> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post<StabilityItemResponse>(this.apiUrl, data, { headers });
	}
}