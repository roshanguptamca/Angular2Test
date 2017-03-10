import { Component, OnInit } from '@angular/core';
 
import { Failure } from '../shared/models/index';
import { HomeService } from '../_services/index';

import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    failureList: Failure[] = [];
    private error:any;
    isApplicationLoading:Boolean = false;
 
    constructor(private homeService: HomeService,  private router:Router) { }
 
    ngOnInit() {
        // get dashboard data from secure api end point
         this.isApplicationLoading = true;
         this.homeService.getFailureList()
         .subscribe(failurs => {
                this.failureList = failurs;
            },
            error => {
                this.error = error;
                debugger;
                console.log(error);
                if(error.detail === "Invalid token." || error.detail === "Time-Out") {
                     this.redirectToLogin();
                }
            },
            () => {
                this.isApplicationLoading = false;
            });

    }

    // Method in component class
  redirectToLogin() {
    localStorage.removeItem('currentUser');
    this.isApplicationLoading = false;
    this.router.navigate(['/login']);
  }
 
}