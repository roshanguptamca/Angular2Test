import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {ApiService } from '../_helpers/api.service';
 
import { Failure } from '../shared/models/index';
 
@Injectable()
export class FailureService {
    constructor(
        private apiService: ApiService) {
    }
 
    getFailureList(): Observable<Failure[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + 'testtockettodo' });
        let options = new RequestOptions({ headers: headers });
        // get users from api
        return this.apiService.getWithOptions('/v5/?method=kpn.otty.YaraList',options);
    }
}