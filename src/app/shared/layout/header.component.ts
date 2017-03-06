import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authenticationService:AuthenticationService

  ) {}
  ngOnInit() {
    
  }
  
  currentUser = this.authenticationService.getCurrentUser();
  
}
