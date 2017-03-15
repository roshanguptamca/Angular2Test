import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {ApiService } from '../_helpers/api.service';
 
import { Failure, User } from '../shared/models/index';
 
@Injectable()
export class FailureService {
    private user: User;
    constructor(
        private apiService: ApiService) {
    }
 
    getFailureList(): Observable<Failure[]> {
        // add authorization header with jwt token
        return this.apiService.getWithOptions("/disturbances/v1/failures/",this.jwt());
       // return this.apiService.getWithOptions("/v5/?method=kpn.otty.YaraList",this.jwt());
    }
    getById(id: number) {
        return this.apiService.get('/disturbances/v1/failures/' + id).map((response: Response) => response.json());
    }
 
    create(failure: Failure) {
        debugger;
        return this.apiService.postWithOption('/disturbances/v1/failures/', this.jwt(), failure).map((response: Response, failure) => response.json());
    }
 
    update(failure: Failure) {
        return this.apiService.putWithOptions('/disturbances/v1/failures/' + failure.id, this.jwt(), failure).map((response: Response) => response.json());
    }
 
    delete(id: number) {
        return this.apiService.deleteWithOption('/disturbances/v1/failures/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Token ' + currentUser.token,
         'Content-Type': 'application/json' },
            );
            return new RequestOptions({ headers: headers });
        }
    }
}