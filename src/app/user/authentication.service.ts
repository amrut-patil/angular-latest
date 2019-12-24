import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApplicationConstants } from '../appConstants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  public login(user: any): Promise<any> {

    let promise = new Promise<any>((resolve, reject) => {
      this.http.post(
        ApplicationConstants.URL + "/login",
        JSON.stringify(user)).subscribe(
          (product) => {
            this.setSession(product);
            this.router.navigate(['/home']);
            resolve(product);
          },
          (error: HttpErrorResponse) => {
            reject(error.error);
          });
    });

    return promise;
  }

  public logout(): Promise<any> {

    let promise = new Promise<any>((resolve, reject) => {
      this.http.post(
        ApplicationConstants.URL + "/logout",
        JSON.stringify({})).subscribe(
          () => {            
            this.clearSessionInformation();
            this.router.navigate(['/login']);
            resolve();
          },
          (error: HttpErrorResponse) => {
            reject(error.error);
          });
    });

    return promise;
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem("id_token");
  }

  private clearSessionInformation() {
    localStorage.setItem('id_token', '');
  }

  private setSession(authResult) {
    localStorage.setItem('id_token', authResult.token);
  }
}
