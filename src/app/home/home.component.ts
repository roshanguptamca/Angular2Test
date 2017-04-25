import { Component, OnInit } from '@angular/core';

import { Failure } from '../shared/models/index';
import { HomeService } from '../_services/index';

import { ActivatedRoute, Router } from '@angular/router';
import { Broadcaster } from '../commons/application-broadcaster.service';
import { MessageEvent } from '../commons/message-event';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    failureList: Failure[] = [];
    private error: any;
    isApplicationLoading: boolean = false;

    constructor(private homeService: HomeService, private router: Router, private broadcaster: Broadcaster,
        private messageEvent: MessageEvent) { }

    ngOnInit() {
        this.router.navigate(['/failure/broadband']);
    }

    getHomePageList() {
        this.isApplicationLoading = true;
        this.emitApplicationLoadingBroadcast();
        this.homeService.getFailureList()
            .subscribe(failurs => {
                this.failureList = failurs;
            },
            error => {
                this.error = error;
                console.log(error);
                if (error.detail === "Invalid token." || error.detail === "Time-Out") {
                    this.redirectToLogin();
                }
            },
            () => {
                this.isApplicationLoading = false;
                this.emitApplicationLoadingBroadcast();
            });
    }

    // Method in component class
    redirectToLogin() {
        localStorage.removeItem('currentUser');
        this.isApplicationLoading = false;
        this.router.navigate(['/login']);
    }

    emitApplicationLoadingBroadcast() {
        this.messageEvent.fireApplicationLoading(this.isApplicationLoading);
    }

}