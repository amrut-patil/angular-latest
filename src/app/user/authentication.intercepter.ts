import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("id_token");
        if (idToken) {
            const cloned = req.clone({
                headers: this.getHeader(idToken)
            });

            return next.handle(cloned).pipe( tap(() => {},
            (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status !== 401) {
               return;
              }
              this.clearSessionInformation();
              this.router.navigate(['login']);
            }
          }));
        }
        else {           
            const cloned = req.clone({headers: this.getHeaderOld(idToken)});
            return next.handle(cloned);
            //return next.handle(req);
        }
    }

    private clearSessionInformation(){
        localStorage.setItem('id_token', '');
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
