import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApplicationConstants } from '../appConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(user: any): Promise<any> {

    let promise = new Promise<any>((resolve, reject) => {
      this.http.post(
        ApplicationConstants.URL + "/login",
        JSON.stringify(user)).subscribe(
          (product) => {
            this.setSession(product);
            resolve(product);
          },
          (error: HttpErrorResponse) => {
            console.error(error)
            reject(error);
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
            resolve();
          },
          (error: HttpErrorResponse) => {
            console.error(error)
            reject(error);
          });
    });

    return promise;
  }

  private clearSessionInformation(){
    localStorage.setItem('id_token', '');
    localStorage.setItem("expires_at", '');
  }

  private setSession(authResult) {
    //const expiresAt = moment().add(authResult.expiresIn,'second');
    var t = new Date();
    t.setSeconds(t.getSeconds() + 1000);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(t.valueOf()));
  }
}
