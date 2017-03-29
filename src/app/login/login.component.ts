import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/index';
import { Broadcaster } from '../commons/application-broadcaster.service';
import { MessageEvent } from '../commons/message-event';


@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    error = '';
    isApplicationLoading:boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private broadcaster: Broadcaster,
        private messageEvent: MessageEvent
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.messageEvent.fireApplicationLoading(this.isApplicationLoading);
    }

  emitApplicationLoadingBroadcast() {
    this.messageEvent.fireApplicationLoading(this.isApplicationLoading);
  }

    login() {
        this.loading = true;
        this.isApplicationLoading = true;
        this.messageEvent.fireApplicationLoading(this.isApplicationLoading);
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            },
            error => {
                this.error = error;
                this.loading = false;
            },
            () => {
                this.loading = false;
                this.isApplicationLoading = false;
                this.messageEvent.fireApplicationLoading(this.isApplicationLoading);
            });
    }
}
