import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../shared/models'

import { ApiService } from  '../_helpers/api.service';
 
@Injectable()
export class AuthenticationService {
    @Output() userAuthentedEvent: EventEmitter<User> = new EventEmitter(true);
    public token: string;
    private tempUser: User;
 
    constructor(private http: Http,private apiService:ApiService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(username: string, password: string): Observable<boolean> {
        return this.apiService.post('/v5/?method=kpn.ci.Login', JSON.stringify({ username: username, password: password }))
            .map((user: User) => {
                // login successful if there's a jwt token in the response
                this.userAuthentedEvent.emit(user);
                let token = user.token;
                if (token) {
                    //this.userService.setUser(user);
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    localStorage.removeItem('currentUser');
                    this.userAuthentedEvent.emit(null);
                    return false;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.userAuthentedEvent.emit(null);
    }

    getCurrentUser():String{
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}