import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { Product } from './product';
import { ApplicationConstants } from '../appConstants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public getProductSource = new Subject<string>();
  public clearRowSelectionSource = new Subject();

  constructor(private http: HttpClient) { }

  public save(product: Product): Promise<Product> {

    let promise = new Promise<Product>((resolve, reject) => {
      this.http.post(
        ApplicationConstants.URL + "/product",
        JSON.stringify(product)
      ).subscribe(
        (product) => {
          resolve(product as Product);
        },
        (error: HttpErrorResponse) => {
          reject(error.error);
        });
    });

    return promise;
  }

  public delete(id: string): Promise<Product> {
    let promise = new Promise<Product>((resolve, reject) => {
      this.http.delete(
        ApplicationConstants.URL + "/product/" + id,
      ).subscribe(
        () => {
          resolve();
        },
        (error: HttpErrorResponse) => {
          reject(error.error);
        });
    });

    return promise;
  }

  public getProduct(productName: string): Promise<Product> {
    let promise = new Promise<Product>((resolve, reject) => {
      this.http.get<Product>(
        ApplicationConstants.URL + "/product/" + productName,
      ).subscribe(
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
    return this.http.get<Product[]>(ApplicationConstants.URL + "/products");
  }

  public getProductMessage(productName: string) {
    this.getProductSource.next(productName);
  }

  public clearRowSelection() {
    this.clearRowSelectionSource.next();
  }

}
