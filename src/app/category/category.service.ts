import { Injectable } from '@angular/core';
import { Category } from './Category';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [];
  private url: string = "http://localhost:8080/category";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private http: HttpClient) { }

  public save(category: Category) {
    this.populatePath(category);
    this.categories.push(category);

    this.http.get(this.url).subscribe((data) => {
      console.log("---------- Get Respone ----------");
      console.log(data);
    });

    this.http.post(
      this.url,
      JSON.stringify(category),
      { headers: this.headers }).subscribe((data) => {
        console.log("---------- Post Respone ----------");
        console.log(data);
      });
  }

  private populatePath(category: Category) {
    category.path = (this.getParentPath(category.parent) || '') + '/' + category.name;
  }

  public getCategories(): Category[] {
    return this.categories;
  }

  public getCategoryNames(): string[] {
    let categoryNames: string[] = [];
    this.categories.forEach(category => {
      categoryNames.push(category.name);
    });
    return categoryNames;
  }

  public getParentPath(categoryName: string) {
    return this.categories.
      filter((category) => category.name === categoryName).
      map((category) => category ? category.path : '');
  }
}
