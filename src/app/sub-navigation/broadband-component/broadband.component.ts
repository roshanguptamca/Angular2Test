import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FailureService } from '../../_services/failure.service';
import { Failure } from '../../shared/models/failure.model';

@Component({
  selector: 'broadband-component',
  templateUrl: './broadband.component.html',
  styleUrls: ['./broadband.component.scss']
})
export class BroadbandComponent implements OnInit {
  public selectedUrl: String;
  failureList: Failure[] = [];
  searchQuery: any[] = [];
  private searchString: string;
  isApplicationLoading:Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private failureService: FailureService
  ) {
    this.selectedUrl = router.url;
  }

  ngOnInit() {
  // get dashboard data from secure api end point
    this.isApplicationLoading = true;
    // get failurs from secure api end point
    this.failureService.getFailureList()
      .subscribe(failurs => {
        this.failureList = failurs;
      },
      error =>{
        console.error(error);
        if(error.detail === "Invalid token." || error.detail === "Time-Out") {
          this.redirectToLogin();
        }
      },
      () => {
         this.isApplicationLoading = false;
      });
  }

    // Method in component class
  trackByFn(index, item) {
    return item.id;
  }

    // Method in component class
  redirectToLogin() {
    localStorage.removeItem('currentUser');
    this.isApplicationLoading = false;
    this.router.navigate(['/login']);
  }

  
}