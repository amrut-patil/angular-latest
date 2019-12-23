import { Injectable } from '@angular/core';
import { Category } from './Category';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { ApplicationConstants } from '../appConstants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public getCategorySource = new Subject<string>();

  constructor(private http: HttpClient) { }

  public save(category: Category): Promise<Category> {

    let promise = new Promise<Category>((resolve, reject) => {
      this.http.post(
        ApplicationConstants.URL + "/category",
        JSON.stringify(category)
      ).subscribe(
        (category) => {
          resolve(category as Category);
        },
        (error: HttpErrorResponse) => {
          reject(error.error);
        });
    });

    return promise;
  }

  public delete(id: string): Promise<Category> {
    let promise = new Promise<Category>((resolve, reject) => {
      this.http.delete(
        ApplicationConstants.URL + "/category/" + id,
      ).subscribe(
        () => {
          resolve();
        },
        (error: HttpErrorResponse) => {
          console.error(error)
          reject(error);
        });
    });

    return promise;
  }

  public getCategory(categoryName: string): Promise<Category> {
    let promise = new Promise<Category>((resolve, reject) => {
      this.http.get<Category>(
        ApplicationConstants.URL + "/category/" + categoryName,
      ).subscribe(
        (category) => {
          resolve(category as Category);
        },
        (error: HttpErrorResponse) => {
          console.error(error)
          reject(error);
        });
    });

    return promise;
  }

  public getCategories(filter?): Observable<Category[]> {
    return this.http.get<Category[]>(ApplicationConstants.URL + "/categories/" + (filter && filter.name ? filter.name : ''));
  }

  public getCategoryMessage(categoryName: string) {
    this.getCategorySource.next(categoryName);
  }

}
