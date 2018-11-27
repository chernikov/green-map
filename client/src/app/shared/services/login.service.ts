import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Login } from '@classes/login.class';
import { LoginResponse } from '@classes/login-response.class';

@Injectable({ providedIn: 'root' })
export class LoginService {
	private apiUrl:string = '/api/login';
    constructor(private http: HttpClient) {}

    login(data:Login):Observable<LoginResponse> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this.http.post<LoginResponse>(this.apiUrl, data, { headers });
	}
}
