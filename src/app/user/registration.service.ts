import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApplicationConstants } from '../appConstants';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient, private router: Router) { }

  public register(user: User): Promise<User> {

    let promise = new Promise<User>((resolve, reject) => {
      this.http.post(
        ApplicationConstants.URL + "/user",
        JSON.stringify(user)).subscribe(
          (product) => {            
            this.router.navigate(['/login']);
            resolve(product as User);
          },
          (error: HttpErrorResponse) => {
            reject(error.error);
          });
    });

    return promise;
  }

}
