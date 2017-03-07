import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../shared/models'

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private authenticated:boolean = false;
  private currentUser = this.authenticationService.getCurrentUser();
  
  constructor(
    private route: ActivatedRoute,
    private authenticationService:AuthenticationService

  ) {}
  ngOnInit() {
     this.authenticationService.userAuthentedEvent.subscribe(user => this.selectedUserEventHandler(user));
     this.selectedUserEventHandler(null);
  }
  
  // event handler for hide and display menu for authorized users
  selectedUserEventHandler(user:User) {
      if(user!= null && user.token){
          this.authenticated = true;
      }
     else{
       this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
        if(this.currentUser){
          this.authenticated = true;
        }
        else{
          this.authenticated = false;
        }
        
      }
  }
  
}
