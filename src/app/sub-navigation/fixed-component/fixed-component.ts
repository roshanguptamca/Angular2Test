import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FailureService, ApplicationUtillService } from '../../_services/index';
import { Failure, FailureTypes, Source, Cause, Errors, Service } from '../../shared/models/index';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DateFormatorSerice, YaraUtilsService } from '../../_helpers/index';
import { DatePipe } from '@angular/common';
import { AppConstant } from '../../commons/application.constant';
import { Broadcaster } from '../../commons/application-broadcaster.service';
import { MessageEvent } from '../../commons/message-event';
import * as _ from "lodash";

@Component({
  selector: 'fixed-component',
  templateUrl: './fixed-component.html',
  styleUrls: ['./fixed-component.scss']
})
export class FixedComponent implements OnInit{
  selectedFailure: any;
  startTime = {hour: 13, minute: 30};
  endTime = {hour:17, minute: 30};
  public selectedUrl: String;
  private searchString: string;
  errors = new Errors();
  public failureList: Failure[] = [];
  model: any = {};
  failureTypesList: FailureTypes[];
  uiFailureTypesList: FailureTypes[];
  selectedFailureTypes: FailureTypes;
  sourceList: Source[];
  selectedsource: Source;
  causeList: Cause[];
  selectedCause: Cause;
  serviceList: Service[];
  selectedService: Service;

  searchQuery: any[] = [];
  isApplicationLoading: boolean = false;
  addOrUpdateMode: boolean = false;
  dateModel: NgbDateStruct;
  dateString: string;
  tempdateString: string;
  failure: Failure;
  page: number = 1;
  private sub: any;
  mode: string;
  closeResult: string;
  sizePerPage: number = AppConstant.APP_LIST_SIZE_PERPAGE;
    message: string;
  _timer: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private failureService: FailureService,
    private applicationUtillService: ApplicationUtillService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private dateFormatorSerice: DateFormatorSerice,
    private datePipe: DatePipe,
    private broadcaster: Broadcaster,
    private messageEvent: MessageEvent,
    private modalService: NgbModal,
    private yaraUtilsService: YaraUtilsService
  ) {
    this.selectedUrl = this.router.url;
  }

  ngOnInit() {
   this.bootstarpComponent();
   this.registerStringBroadcast();
  }

  registerStringBroadcast() {
    this.broadcaster.on<string>('message')
      .subscribe(message => {
        this.message = message;
        this.getAllFailureList();
        if (this._timer) {
          clearTimeout(this._timer);
        }
        this._timer = setTimeout(() => {
          this.message = '';
          this._timer = null;
        }, 3000);
      });
  }

bootstarpComponent(){
    this.uiFailureTypesList = this.applicationUtillService.getFailureTypesByCause(1);
    this.sourceList = this.applicationUtillService.getSources();
    this.selectedsource = this.sourceList[0];
    this.causeList = this.applicationUtillService.getCauses();
    this.selectedCause = this.causeList[0];
    this.serviceList = this.applicationUtillService.getServices();
    this.selectedService = this.serviceList[0];
    this.failureTypesList = this.applicationUtillService.getFailureTypesByCause(this.selectedCause.id);
    this.selectedFailureTypes = this.failureTypesList[0];
    // get dashboard data from secure api end point
    this.isApplicationLoading = true;
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
        this.isApplicationLoading = false;
        this.emitApplicationLoadingBroadcast();
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
  trackByFn(index, item) {
    return item.id;
  }

  // Method in component class
  updateFailure(failure: Failure) {
    this.mode = 'update';
    this.selectedFailure = failure;
    this.errors.reset();
    this.addOrUpdateMode = true;
    this.selectedCause = _.find(this.causeList, function(o) { return o.key == failure.cause; });
    this.selectedFailureTypes = _.find(this.uiFailureTypesList, function(o) { return o.key == failure.type;});
    this.failureTypesList =  this.applicationUtillService.getFailureTypesByCause(this.selectedCause.id);
    this.selectedsource = _.find(this.sourceList, function(o) { return o.key == failure.source; });
    this.model.endDate = this.datePipe.transform(failure.end_date, "dd-MM-yyyy HH:mm:ss");
    this.model.startDate = this.datePipe.transform(failure.start_date, "dd-MM-yyyy HH:mm:ss");
    this.model.failureId = failure.id;
    this.model.description =  failure.description;
    this.model.longDescription =  failure.long_description;
    this.model.failureId = failure.id;
    //this.model.region = failure.region;
    this.model.state = failure.state;
  }

// Method in component classfailure
  addNewFailure(failure: Failure) {
    this.mode = 'create';
    this.errors.reset();
    let today = new Date();
    let todayEndDate = new Date ( today );
    todayEndDate.setHours ( today.getHours() + 4 );
    this.addOrUpdateMode = true;
    this.model = {
      startDate: new Date(),
      endDate: todayEndDate
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
    this.prepaireFailure();
    if(this.failure.id){
      this.patchFailure();
    }
    else {
      this.saveFailure();
    }
  }

// Method in component class
  saveFailure() {
    this.isApplicationLoading = true;
    this.emitApplicationLoadingBroadcast();
    this.failureService.create(this.failure)
      .subscribe(newFailure => {
        console.log(newFailure);
        this.addOrUpdateMode = false;
        this.getAllFailureList();
      },
      error => {
        console.error(error);
        if (error.detail === "Invalid token." || error.detail === "Time-Out") {
          this.redirectToLogin();
        }
        else{
          this.errors.apiError = error;
           this.isApplicationLoading = false;
          this.emitApplicationLoadingBroadcast();
        }
      },
      () => {
        this.isApplicationLoading = false;
        this.emitApplicationLoadingBroadcast();
      });
  }

// Method in component class
  patchFailure() {
    this.isApplicationLoading = true;
    this.emitApplicationLoadingBroadcast();
    this.failureService.update(this.failure)
      .subscribe(newFailure => {
        console.log(newFailure);
        this.addOrUpdateMode = false;
        this.getAllFailureList();
      },
      error => {
        console.error(error);
        if (error.detail === "Invalid token." || error.detail === "Time-Out") {
          this.redirectToLogin();
        }
        else{
          this.errors.apiError = error;
          this.isApplicationLoading = false;
          this.emitApplicationLoadingBroadcast();
        }
      },
      () => {
        this.isApplicationLoading = false;
        this.emitApplicationLoadingBroadcast();
      });
  }

// Method in component class
  closeFailure(failure: Failure) {
    this.isApplicationLoading = true;
    this.emitApplicationLoadingBroadcast();
    this.failureService.closeFailure(failure.id)
      .subscribe(newFailure => {
        console.log(newFailure);
        this.addOrUpdateMode = false;
        this.getAllFailureList();
      },
      error => {
        console.error(error);
        if (error.detail === "Invalid token." || error.detail === "Time-Out") {
          this.redirectToLogin();
        }else if(error.detail != null && error.detail === 'INVALID_TRANSITION'){
          this.errors.apiError[0] = error.detail;
          this.isApplicationLoading = false;
          this.emitApplicationLoadingBroadcast();
        }
        else{
          this.errors.apiError = error;
          this.isApplicationLoading = false;
          this.emitApplicationLoadingBroadcast();
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

   this.failure.long_description = this.model.longDescription;
   this.failure.description = this.model.description;
  //  if(this.model.region){
  //   this.failure.region = this.model.region;
  //  }
   
   if(this.failure.type && this.failure.type == 3 && this.selectedService){
      this.failure.service = this.selectedService.value;
   }
    // start date validation
   if(this.mode == "update" &&  this.model.startDate && this.selectedFailure.start_date){
     var same = this.yaraUtilsService.isDateEquals(this.model.startDate,this.selectedFailure.start_date );
      if(!same){
        this.failure.start_date = this.datePipe.transform(this.model.startDate, "yyyy-MM-dd HH:mm:ss");
      }
    }
    else{
      this.failure.start_date = this.datePipe.transform(this.model.startDate, "yyyy-MM-dd HH:mm:ss");
    }
    // end date validation
    if(this.mode == "update" && this.model.endDate && this.selectedFailure.end_date){
     var same = this.yaraUtilsService.isDateEquals(this.model.endDate,this.selectedFailure.end_date );
      if(!same){
        this.failure.end_date = this.datePipe.transform(this.model.endDate, "yyyy-MM-dd HH:mm:ss");
      }
    }
    else {
      this.failure.end_date = this.datePipe.transform(this.model.endDate, "yyyy-MM-dd HH:mm:ss");
    }

   this.failure.id = this.model.failureId;

    if(this.mode === "create" && this.model.criteria){
    this.failure.criteria = this.failureService.getCriteriaList(this.model.criteria)
   }
 
  }

 ngOnDestroy() {
    this.sub.unsubscribe();
  }

onChangeCause(newvalue){
  this.selectedCause = this.causeList[newvalue];
  this.failureTypesList = this.applicationUtillService.getFailureTypesByCause(this.selectedCause.id);
  this.selectedFailureTypes = this.failureTypesList[0];
}

getApiFilterString(){
  let queryString: string ="";
  if(AppConstant.APP_FAILURE_FIXED_URL === this.selectedUrl){
      queryString = "?cause=disturbance&source=gui&source=trendanalyser&type=fixed&type=geographical-fixed&type=customers-fixed&state=new&state=collecting&state=planned&state=open&state=awaiting&state=notifying";
  } else if(AppConstant.APP_PLANNED_MAINTENCE_FIXED_URL === this.selectedUrl){
     queryString = "?cause=planned-maintenance&source=gui&source=trendanalyser&type=fixed&type=geographical-fixed&type=customers-fixed&state=new&state=collecting&state=planned&state=open&state=awaiting&state=notifying";
  } else if(AppConstant.APP_ARCHIVED_FAILURE_FIXED_URL === this.selectedUrl){
     queryString = "?cause=disturbance&source=gui&source=trendanalyser&type=fixed&type=geographical-fixed&type=customers-fixed&state=closed";
  } else if(AppConstant.APP_ARCHIVED_PLANNED_MAINTENCE_FIXED_URL === this.selectedUrl){
     queryString = "?cause=planned-maintenance&source=gui&source=trendanalyser&type=fixed&type=geographical-fixed&type=customers-fixed&state=closed";
  }
  return queryString;
}

  emitApplicationLoadingBroadcast() {
    this.messageEvent.fireApplicationLoading(this.isApplicationLoading);
  }

onChangFailureType(newvalue) {
  this.selectedFailureTypes = this.uiFailureTypesList[newvalue];
}

onChangService(newvalue) {
  this.selectedService = this.serviceList[newvalue];
}

  isCloseButtonEnabled(failureStatus){
    var isCloseIconDisplay = false;
   if (AppConstant.APP_ARCHIVED_FAILURE_FIXED_URL === this.selectedUrl || AppConstant.APP_ARCHIVED_PLANNED_MAINTENCE_FIXED_URL === this.selectedUrl) {
        isCloseIconDisplay = false;
    } else if(failureStatus === 'open' || failureStatus === 'new' || failureStatus === 'planned' || failureStatus === 'awaiting'){
      isCloseIconDisplay = true;
    }
    else {
      isCloseIconDisplay = false;
    }
    return isCloseIconDisplay;
  }

}
