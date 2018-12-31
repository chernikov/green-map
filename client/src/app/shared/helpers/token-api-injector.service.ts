import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@store';
import { tap } from 'rxjs/operators';
 
export class TokenApiInjector implements HttpInterceptor {
    constructor(
        private ngRedux:NgRedux<IAppState>,
    ) { }

    intercept(request:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        let token:string;
        this.ngRedux.select<string>('authToken').subscribe(data => token = data);

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
                console.log("api error");
            }
        }));;
    }
}

export const TOKEN_API_INJECTOR = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenApiInjector,
    deps: [NgRedux],
    multi: true
}