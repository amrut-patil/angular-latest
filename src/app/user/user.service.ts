import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApplicationConstants } from '../appConstants';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  constructor(private http: HttpClient) { }

  public save(user: User): Promise<User> {

    let promise = new Promise<User>((resolve, reject) => {
      this.http.post(
        ApplicationConstants.URL + "/user",
        JSON.stringify(user),
        { headers: this.headers }).subscribe(
          (product) => {            
            resolve(product as User);
          },
          (error: HttpErrorResponse) => {
            console.error(error)
            reject(error);
          });
    });

    return promise;
  }

}
