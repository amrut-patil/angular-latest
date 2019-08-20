import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { ApplicationConstants } from '../appConstants';

export interface Socket {
  on(event: string, callback: (data: any) => void);
  emit(event: string, data: any);
}

@Injectable({
  providedIn: 'root'
})
export class RealTimeService {

  socket: Socket;
  productObserver: Observer<any>;
  productObservable: Observable<any>;
  categoryObserver: Observer<any>;
  categoryObservable: Observable<any>;

  constructor() {
    this.socket = socketIo(ApplicationConstants.URL);
  }

  createCategoryObservable(): Observable<any> {
    this.categoryObservable = new Observable(observer => {
      this.categoryObserver = observer;
    });
    return this.categoryObservable
  }

  observeCatgories(): Observable<any> {
    if (this.categoryObservable) {
      return this.categoryObservable;
    } else {
      this.socket.on('category', (res) => {
        this.categoryObserver.next(res.data);
      });
      return this.createCategoryObservable();
    }
  }

  createProductObservable(): Observable<any> {
    this.productObservable = new Observable(observer => {
      this.productObserver = observer;
    });
    return this.productObservable;
  }

  observeProducts(): Observable<any> {
    if (this.productObservable) {
      return this.productObservable;
    } else {
      this.socket.on('product', (res) => {
        this.productObserver.next(res.data);
      });
      return this.createProductObservable();
    }
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }
}