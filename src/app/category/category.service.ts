import { Injectable } from '@angular/core';
import { Category } from './Category';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string = "http://localhost:8080";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  public getCategorySource = new Subject<string>();

  constructor(private http: HttpClient) { }

  public save(category: Category): Promise<Category> {

    let promise = new Promise<Category>((resolve, reject) => {
      this.http.post(
        this.url + "/category",
        JSON.stringify(category),
        { headers: this.headers }).subscribe(
          (category) => {
            console.log(category);
            resolve(category as Category);
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
        this.url + "/category/" + categoryName,
        { headers: this.headers }).subscribe(
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
    return this.http.get<Category[]>(this.url + "/categories/" + (filter && filter.name ? filter.name : ''), { headers: this.headers });
  }

  public getCategoryMessage(categoryName: string) {
    this.getCategorySource.next(categoryName);
  }

}
