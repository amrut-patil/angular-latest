import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { Product } from './product';
import { ApplicationConstants } from '../appConstants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  public getProductSource = new Subject<string>();

  constructor(private http: HttpClient) { }

  public save(product: Product): Promise<Product> {

    let promise = new Promise<Product>((resolve, reject) => {
      this.http.post(
        ApplicationConstants.URL + "/product",
        JSON.stringify(product),
        { headers: this.headers }).subscribe(
          (product) => {
            //console.log(product);
            resolve(product as Product);
          },
          (error: HttpErrorResponse) => {
            console.error(error)
            reject(error);
          });
    });

    return promise;
  }

  public delete(id: string): Promise<Product> {
    let promise = new Promise<Product>((resolve, reject) => {
      this.http.delete(
        ApplicationConstants.URL + "/product/" + id,
        { headers: this.headers }).subscribe(
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

  public getProduct(productName: string): Promise<Product> {
    let promise = new Promise<Product>((resolve, reject) => {
      this.http.get<Product>(
        ApplicationConstants.URL + "/product/" + productName,
        { headers: this.headers }).subscribe(
          (product) => {
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
    return this.http.get<Product[]>(ApplicationConstants.URL + "/products", { headers: this.headers });
  }

  public getProductMessage(productName: string) {
    this.getProductSource.next(productName);
  }

}
