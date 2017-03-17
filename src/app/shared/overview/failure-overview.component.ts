import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { AffectedCoustomer, AffectedElement, Failure, Errors } from '../models/index';
import { FailureOverviewService, ApplicationUtillService } from '../../_services/index';

@Component({
  selector: 'failure-overview',
  templateUrl: './failure-overview.component.html',
  styleUrls: ['./failure-overview.component.scss']
})
export class FailureOverviewComponent implements OnInit, OnDestroy  {
  private selectedUrl: string;
  failUreId: number;
  private sub: any;
  errors = new Errors();
  public affectedElementList: AffectedElement[] = [];
  public affectedCoustomerList: AffectedCoustomer[] = [];
  isApplicationLoading: boolean = false;

   constructor(config: NgbTabsetConfig, private route: ActivatedRoute,
    private failureOverviewService: FailureOverviewService,
    private applicationUtillService: ApplicationUtillService,
    private router: Router
    ) {
    // customize default values of tabsets used by this component tree
    config.justify = 'center';
    config.type = 'pills';
    
  }

  ngOnInit() {
    this.isApplicationLoading = true;
    this.selectedUrl = this.router.url;
    this.sub = this.route.params.subscribe(params => {
       this.failUreId = +params['id']; // (+) converts string 'id' to a number
       // In a real app: dispatch action to load the details here.
       this.getAffectedElementsByFailureId(this.failUreId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

redirectToParent() {
  var tempStringArray: string[];
  if(this.selectedUrl  && this.selectedUrl != null){
    tempStringArray = this.selectedUrl.split('/');
    this.router.navigate([tempStringArray[1]+"/"+tempStringArray[2]]);
  }
}
  // v5/?method=kpn.otty.YaraAffectedElementsList

  getAffectedElementsByFailureId(failureId: number){
        // get failurs from secure api end point
    this.errors.reset();
    this.sub = this.failureOverviewService.getAffectedElementsByFailureId(failureId)
      .subscribe(affectedElements => {
        this.affectedElementList = affectedElements;
      },
      error => {
        console.error(error);
        if (error.detail === "Invalid token." || error.detail === "Time-Out") {
          this.redirectToLogin();
        }else {
          // todo
        }
      },
      () => {
        this.isApplicationLoading = false;
      });
  }

  getAffectedCustomersByFailureId(failureId: number){

            // get failurs from secure api end point
    this.errors.reset();
    this.sub = this.failureOverviewService.getAffectedCustomersByFailureId(failureId)
      .subscribe(affectedCoustomers => {
        this.affectedCoustomerList = affectedCoustomers;
      },
      error => {
        console.error(error);
        if (error.detail === "Invalid token." || error.detail === "Time-Out") {
          this.redirectToLogin();
        }else {
          // todo
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
