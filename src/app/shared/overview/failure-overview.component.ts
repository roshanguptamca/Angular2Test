import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { AffectedCoustomer, AffectedElement, Failure, Errors } from '../models/index';
import { FailureOverviewService, ApplicationUtillService } from '../../_services/index';
import { Broadcaster } from '../../commons/application-broadcaster.service';
import { MessageEvent } from '../../commons/message-event';
import { AppConstant } from '../../commons/application.constant';

@Component({
  selector: 'failure-overview',
  templateUrl: './failure-overview.component.html',
  styleUrls: ['./failure-overview.component.scss']
})
export class FailureOverviewComponent implements OnInit  {
  private selectedUrl: string;
  failUreId: number;
  private sub: any;
  errors = new Errors();
  public affectedElementList: AffectedElement[] = [];
  public affectedCoustomerList: AffectedCoustomer[] = [];
  isApplicationLoading: boolean = false;
  pageSize: number = 1;
  sizePerPage: number = AppConstant.APP_LIST_SIZE_PERPAGE;

   constructor(config: NgbTabsetConfig, private route: ActivatedRoute,
    private failureOverviewService: FailureOverviewService,
    private applicationUtillService: ApplicationUtillService,
    private router: Router,
    private broadcaster: Broadcaster,
    private messageEvent: MessageEvent
    ) {
    // customize default values of tabsets used by this component tree
    config.justify = 'center';
    config.type = 'pills';
    
  }

  ngOnInit() {
    this.selectedUrl = this.router.url;
    this.sub = this.route.params.subscribe(params => {
       this.failUreId = +params['id']; // (+) converts string 'id' to a number
       // In a real app: dispatch action to load the details here.
       this.getAffectedElementsByFailureId(this.failUreId);
       this.getAffectedCustomersByFailureId(this.failUreId);
    });
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
    // get Affected Elements from secure api end point
    this.isApplicationLoading = true;
    this.emitApplicationLoadingBroadcast();
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
        this.isApplicationLoading = false;
        this.emitApplicationLoadingBroadcast();
      },
      () => {
        this.isApplicationLoading = false;
        this.emitApplicationLoadingBroadcast();
      });
  }

  getAffectedCustomersByFailureId(failureId: number){
    // get Affected Customers from secure api end point
    this.isApplicationLoading = true;
    this.emitApplicationLoadingBroadcast();
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
        this.isApplicationLoading = false;
        this.emitApplicationLoadingBroadcast();
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
  
  // Method in component class
  trackByFn(index, item) {
    return item.id;
  }

  emitApplicationLoadingBroadcast() {
    this.messageEvent.fireApplicationLoading(this.isApplicationLoading);
  }
}
