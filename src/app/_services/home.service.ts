import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {ApiService } from '../_helpers/api.service';
 
import { Failure, User,FailureTypes } from '../shared/models/index';
 
@Injectable()
export class HomeService {
    private user: User;
    uiFailureTypesList: FailureTypes[];
    failureTypes:FailureTypes;

    constructor(
        private apiService: ApiService) {
    }
 
    getFailureList(): Observable<Failure[]> {
        // add authorization header with jwt token
         this.user =  JSON.parse(localStorage.getItem('currentUser'));
         if(this.user != null && this.user.token){
             let headers = new Headers({ 'Authorization': 'Token ' + this.user.token });
             let options = new RequestOptions({ headers: headers });
             //return this.apiService.getWithOptions('/v5/?method=kpn.otty.YaraList',options);
             return this.apiService.getWithOptions("/disturbances/v1/failures/",options);
         }
         else{
             // redirect to login page
         }

       
    }
}