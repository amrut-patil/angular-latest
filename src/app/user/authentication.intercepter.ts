import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("id_token");
        if (idToken) {
            const cloned = req.clone({
                headers: this.getHeader(idToken)
            });

            return next.handle(cloned);
        }
        else {           
            const cloned = req.clone({headers: this.getHeaderOld(idToken)});
            return next.handle(cloned);
            //return next.handle(req);
        }
    }

    private getHeader(idToken: any) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json; charset=utf-8');        
        headers = headers.append('Authorization', 'Bearer ' + idToken);
        return headers;
    }

    private getHeaderOld(idToken: any) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json; charset=utf-8');        
        return headers;
    }

}