import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FailureService, ApplicationUtillService } from '../../_services/index';
import { Failure, FailureTypes, Source, Cause, Errors, Service } from '../../shared/models/index';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { DateFormatorSerice } from '../../_helpers/index';
import { DatePipe } from '@angular/common';
import { AppConstant } from '../../commons/application.constant';
import { Broadcaster } from '../../commons/application-broadcaster.service';
import { MessageEvent } from '../../commons/message-event';
 
@Component({
  selector: 'broadband-component',
  templateUrl: './broadband.component.html',
  styleUrls: ['./broadband.component.scss']
})
export class BroadbandComponent implements OnInit {
  startTime = {hour: 13, minute: 30};
  endTime = {hour:17, minute: 30};
  public selectedUrl: String;
  private searchString: string;
  errors = new Errors();
  public failureList: Failure[] = [];
  model: any = {};
  failureTypesList: FailureTypes[];
  selectedFailureTypes: FailureTypes;
  sourceList: Source[];
  selectedsource: Source;
  causeList: Cause[];
  selectedCause: Cause;
  serviceList: Service[];
  selectedService: Service;

  searchQuery: any[] = [];
  isApplicationLoading: boolean = false;
  addOrUpdateMode: Boolean = false;
  dateModel: NgbDateStruct;
  dateString: string;
  tempdateString: string;
  failure: Failure;
  page: number = 1;
  private sub: any;

  message: string;
  _timer: any;
  
  sizePerPage: number = AppConstant.APP_LIST_SIZE_PERPAGE;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private failureService: FailureService,
    private applicationUtillService: ApplicationUtillService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private dateFormatorSerice: DateFormatorSerice,
    private datePipe: DatePipe,
    private broadcaster: Broadcaster,
    private messageEvent: MessageEvent
  ) {
    debugger;
    this.selectedUrl = this.router.url;
  }

  ngOnInit() {
   // get dashboard data from secure api end point
   this.isApplicationLoading = true;
   this.getAllFailureList();
   this.bootstarpComponent();
   this.isApplicationLoading = false;
   this.getAllFailureList();
  }

bootstarpComponent(){
   this.sourceList = this.applicationUtillService.getSources();
    this.selectedsource = this.sourceList[0];
    this.causeList = this.applicationUtillService.getCauses();
    this.selectedCause = this.causeList[0];
    this.serviceList = this.applicationUtillService.getServices();
    this.selectedService = this.serviceList[0];
    this.failureTypesList = this.applicationUtillService.getFailureTypesByCause(this.selectedCause.id);
    this.selectedFailureTypes = this.failureTypesList[0];
    // get dashboard data from secure api end point
    this.getAllFailureList();
}

 getAllFailureList() {
    // get failurs from secure api end point
    this.isApplicationLoading = true;
    this.emitApplicationLoadingBroadcast();
    this.errors.reset();
    this.sub = this.failureService.getFailureList(this.getApiFilterString())
      .subscribe(failurs => {
        this.failureList = failurs;
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
        this.emitApplicationLoadingBroadcast();
      });
 }

  // Method in component class
  trackByFn(index, item) {
    return item.id;
  }

  // Method in component class
  updateFailure(failure: Failure) {
    this.errors.reset();
    this.addOrUpdateMode = true;
    this.selectedCause = this.causeList[failure.cause];
    this.selectedFailureTypes = this.failureTypesList[failure.type];
    this.selectedsource =  this.sourceList[failure.source];
    this.model.endDate = failure.end_date;
    this.model.startDate = failure.start_date;
  }

  // Method in component class
  addNewFailure(failure: Failure) {
    this.errors.reset();
    let today = new Date();
    this.addOrUpdateMode = true;
    this.model = {
      startDate: new Date(),
      endDate: this.datePipe.transform((today.setHours(today.getHours() + 4)),"yyyy-MM-dd hh:mm")
    };
    this.bootstarpComponent();
  }

  // Method in component class
  redirectToLogin() {
    localStorage.removeItem('currentUser');
    this.isApplicationLoading = false; 
    this.addOrUpdateMode = false;
    this.router.navigate(['/login']);
  }

    // Method in component class
  redirectToOverview(failureId: number) {
    this.router.navigate([this.selectedUrl+'/overview/'+failureId]);
  }

// Method in component class
  createFailure() {
     this.isApplicationLoading = true;
     this.emitApplicationLoadingBroadcast();
    console.log(this.model);
    console.log(this.selectedFailureTypes);
    console.log(this.selectedsource);
    console.log(this.selectedCause);
    this.prepaireFailure();
    this.failureService.create(this.failure)
      .subscribe(newfailur => {
       // this.failureList = failurs;
        console.log(newfailur);
        this.addOrUpdateMode = false;
        this.getAllFailureList();
      },
      error => {
        console.error(error);
        debugger;
        if (error.detail === "Invalid token." || error.detail === "Time-Out") {
          this.redirectToLogin();
        }
        else{
          this.errors.apiError = error;
        }
      },
      () => {
        this.isApplicationLoading = false;
        this.emitApplicationLoadingBroadcast();
      });
  }
// Method in component class
  prepaireFailure() {
   this.failure = new Failure();
   this.failure.cause = this.selectedCause.id;
   this.failure.source = this.selectedsource.id;
   this.failure.type = this.selectedFailureTypes.id;
   this.failure.service = this.selectedService.id;
   this.failure.start_date = this.model.startDate;
   this.failure.end_date = this.model.endDate;
   this.failure.criteria = [
      this.formateCriteria(this.model.criteria)
   ];
   debugger;
  }

 ngOnDestroy() {
    this.sub.unsubscribe();
  }

formateCriteria(newValue){
  var tempCriteria;
  var templist: string;
  if(newValue != null && newValue!= "" && newValue.length > 0){
    tempCriteria = newValue.split(",");
    tempCriteria.forEach(element => {
      if(templist){
        templist = templist + '"'+element +'",';
      }
      else{
        templist = '"'+element +'",';
      }
    });
    return templist.substr(1,templist.length-3);
  }
  else {
    return "";
  }
}

onChangeCause(newvalue){
  this.selectedCause = this.causeList[newvalue];
  this.failureTypesList = this.applicationUtillService.getFailureTypesByCause(this.selectedCause.id);
  this.selectedFailureTypes = this.failureTypesList[0];
}

getApiFilterString(){
  debugger;
  let queryString: string ="";
  if(AppConstant.APP_FAILURE_BORDBAND_URL === this.selectedUrl){
      queryString = "?cause=0&source=0&source=2&type=0&type=1&type=2&type=7&type=8";
  } else if(AppConstant.APP_PLANNED_MAINTENCE_BORDBAND_URL === this.selectedUrl){
     queryString = "?cause=1&source=0&source=2&type=0&type=1&type=2&type=7&type=8";
  } else if(AppConstant.APP_ARCHIVED_FAILURE_BORDBAND_URL === this.selectedUrl){
     queryString = "?cause=0&source=0&source=2&type=0&type=1&type=2&type=7&type=8&state=closed";
  } else if(AppConstant.APP_ARCHIVED_PLANNED_MAINTENCE_BORDBAND_URL === this.selectedUrl){
     queryString = "?cause=1&source=0&source=2&type=0&type=1&type=2&type=7&type=8&state=closed";
  }
  return queryString;
}
  emitApplicationLoadingBroadcast() {
    this.messageEvent.fireApplicationLoading(this.isApplicationLoading);
  }
}