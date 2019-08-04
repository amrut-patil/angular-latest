import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = "http://localhost:8080";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  constructor(private http: HttpClient) { }

  public save(product: Product): Promise<Product> {

    let promise = new Promise<Product>((resolve, reject) => {
      this.http.post(
        this.url + "/product",
        JSON.stringify(product),
        { headers: this.headers }).subscribe(
          (product) => {
            console.log(product);
            resolve(product as Product);
          },
          (error: HttpErrorResponse) => {
            console.error(error)
            reject(error);
          });
    });

    return promise;
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + "/products", { headers: this.headers });
  }

}
