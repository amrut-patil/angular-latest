import { Injectable } from '@angular/core';
import { Category } from './Category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string = "http://localhost:8080/category";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private http: HttpClient) { }

  public save(category: Category) {

    // this.http.get(this.url).subscribe((data) => {
    //   console.log("---------- Get Respone ----------");
    //   console.log(data);
    // });

    this.http.post(
      this.url,
      JSON.stringify(category),
      { headers: this.headers }).subscribe((data) => {
        console.log("---------- Post Respone ----------");
        console.log(data);
      });
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("http://localhost:8080/categories", { headers: this.headers })
  }

}
