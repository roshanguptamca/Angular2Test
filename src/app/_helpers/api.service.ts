import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeoutWith';

import { Errors } from '../shared/models/index';


@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private errors: Errors
  ) {}

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json'
    };

    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    if(error.status === 0){
      return Observable.throw({'detail': 'Time-Out'});
    }
    else {
       return Observable.throw(error.json());
    }
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params })
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

  getWithOptions(path: string, requestOptions:RequestOptions): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, requestOptions)
    //.timeoutWith(1000000, Observable.defer(() => Observable.throw({'errorCode': 'Time-Out'})))
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

  putWithOptions(path: string, requestOptions:RequestOptions, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),requestOptions)
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

 postWithOption(path: string, requestOptions:RequestOptions, body: Object = {}): Observable<any> {
   debugger;
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),requestOptions)
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

 deleteWithOption(path:String,  requestOptions:RequestOptions): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }
}