import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@store';

import { StabilityItem } from '@classes/stability-item.class';
import { StabilityService } from '@services/stability.service';
import { StabilityErrorType } from '@enums/stability.enum';
 
export class TokenApiInjector implements HttpInterceptor {
    constructor(
        private _ngRedux:NgRedux<IAppState>,
        private _stabilityService:StabilityService
    ) { }

    intercept(request:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        let token:string;
        this._ngRedux.select<string>('authToken').subscribe(data => token = data);

        if(token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${token}`
                }
            });
            request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
        }
 
        return next.handle(request).pipe(tap((event:HttpEvent<any>) => {}, (err: any) => {
            if(err instanceof HttpErrorResponse) {

                let data = new StabilityItem({
                    url: window.location.href,
                    apiUrl: request.url,
                    message: err.message,
                    type: StabilityErrorType.webApi,
                    addedDate: new Date()
                });
            
                let jwtToken = localStorage.getItem('authToken');
                if(jwtToken) data.jwtToken = jwtToken;
                if(request.body) data.postData = JSON.stringify(request.body);

                this._stabilityService.save(data).subscribe();
            }
        }));;
    }
}

export const TOKEN_API_INJECTOR = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenApiInjector,
    deps: [NgRedux, StabilityService],
    multi: true
}