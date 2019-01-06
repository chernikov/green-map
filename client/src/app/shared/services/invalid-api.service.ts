import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvalidApiService {
  private apiUrl:string = '/api/invalid-api';
  constructor(private _http:HttpClient) {}

  post(data?:any):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post<any>(this.apiUrl, data, { headers });
	}
}