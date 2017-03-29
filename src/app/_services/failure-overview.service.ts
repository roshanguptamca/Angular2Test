import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {ApiService } from '../_helpers/api.service';
 
import { AffectedElement, AffectedCoustomer, User } from '../shared/models/index';
 
@Injectable()
export class FailureOverviewService {
    private user: User;
    constructor(
        private apiService: ApiService) {
    }
    getAffectedElementsByFailureId(failureId: number): Observable<AffectedElement[]> {
        // add authorization header with jwt token
        return this.apiService.getWithOptions("/disturbances/v1/failures/"+failureId+"/affected-elements/",this.jwt());
       // return this.apiService.getWithOptions("/v5/?method=kpn.otty.YaraAffectedElementsList",this.jwt());
    }

    getAffectedCustomersByFailureId(failureId: number): Observable<AffectedCoustomer[]> {
        // add authorization header with jwt token
        return this.apiService.getWithOptions("/disturbances/v1/failures/"+failureId+"/affected-customers/",this.jwt());
       // return this.apiService.getWithOptions("/v5/?method=kpn.otty.YaraAffectedElementsList",this.jwt());
    }
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