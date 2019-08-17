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
  categoryObserver: Observer<any>;

  constructor() {
    this.socket = socketIo(ApplicationConstants.URL);
  }

  createCategoryObservable(): Observable<any> {
    return new Observable(observer => {
      this.categoryObserver = observer;
    });
  }

  observeCatgories(): Observable<any> {
    this.socket.on('category', (res) => {
      this.categoryObserver.next(res.data);
    });
    return this.createCategoryObservable();
  }

  createProductObservable(): Observable<any> {
    return new Observable(observer => {
      this.productObserver = observer;
    });
  }

  observeProducts(): Observable<any> {
    this.socket.on('product', (res) => {
      this.productObserver.next(res.data);
    });
    return this.createProductObservable();
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