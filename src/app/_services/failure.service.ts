import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ApiService } from '../_helpers/api.service';

import { Failure, User } from '../shared/models/index';

@Injectable()
export class FailureService {
    private user: User;
    constructor(
        private apiService: ApiService) {
    }

    getFailureList(queryString: string): Observable<Failure[]> {
        // add authorization header with jwt token
        return this.apiService.getWithOptions("/disturbances/v1/failures/" + queryString, this.jwt());
        // return this.apiService.getWithOptions("/v5/?method=kpn.otty.YaraList",this.jwt());
    }
    getById(id: number) {
        return this.apiService.get('/disturbances/v1/failures/' + id).map((response: Response) => response.json());
    }

    create(failure: Failure) {
        return this.apiService.postWithOption('/disturbances/v1/failures/', this.jwt(), failure);
    }

    update(failure: Failure) {
        return this.apiService.postWithOption('/disturbances/v1/failures/' + failure.id +"/", this.jwt1(), failure);
    }

    closeFailure(id: number) {
         return this.apiService.postWithOption('/disturbances/v1/failures/' + id +"/", this.jwt1(), {"close":true});
    }

    updateNotification(failure: Failure, templateId:string) {
        var data = {
            "template_id": templateId
        }
        return this.apiService.postWithOption('/disturbances/v1/failures/' + failure.id +"/"+"/update-notification/", this.jwt(), data);
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({
                'Authorization': 'Token ' + currentUser.token,
                'Content-Type': 'application/json'
            },
            );
            return new RequestOptions({ headers: headers });
        }
    }

    // private helper methods
    private jwt1() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({
                'Authorization': 'Token ' + currentUser.token,
                'Content-Type': 'application/json',
                'X-HTTP-METHOD-OVERRIDE': "PATCH"
            },
            );
            return new RequestOptions({ headers: headers });
        }
    }

    formateCriteria(newValue) {
        var tempCriteria;
        var templist: string;
        if (newValue != null && newValue != "" && newValue.length > 0) {
            tempCriteria = newValue.split(";");
            tempCriteria.forEach(element => {
                if (templist) {
                    templist = templist + '"' + element + '",';
                }
                else {
                    templist = '"' + element + '",';
                }
            });
            return templist.substr(1, templist.length - 3);
        }
        else {
            return "";
        }
    }

    getCriteriaList(newValue) {
        var tempCriteria;
        var templist: string;
        if (newValue != null && newValue != "" && newValue.length > 0) {
           return tempCriteria = newValue.split(";");
        }
        else {
            return "";
        }
    }
}