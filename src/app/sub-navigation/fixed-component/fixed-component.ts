import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FailureService, ApplicationUtillService } from '../../_services/index';
import { Failure, FailureTypes, Source, Cause, Errors, Service } from '../../shared/models/index';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DateFormatorSerice } from '../../_helpers/index';
import { DatePipe } from '@angular/common';
import { AppConstant } from '../../commons/application.constant';
import { Broadcaster } from '../../commons/application-broadcaster.service';
import { MessageEvent } from '../../commons/message-event';


@Component({
  selector: 'fixed-component',
  templateUrl: './fixed-component.html',
  styleUrls: ['./fixed-component.scss']
})
export class FixedComponent implements OnInit{
  
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
    private modalService: NgbModal
  ) {
    this.selectedUrl = this.router.url;
  }

  ngOnInit() {
   this.bootstarpComponent();
  }

  // open(content) {
  //   this.modalService.open(content).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

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
    this.errors.reset();
    this.addOrUpdateMode = true;
    this.selectedCause = this.causeList[failure.cause];
    this.selectedFailureTypes = this.failureTypesList[failure.type];
    this.selectedsource =  this.sourceList[failure.source];
    this.model.endDate = failure.end_date;
    this.model.startDate = failure.start_date;
    this.model.failureId = failure.id;
    this.model.description =  failure.description;
    this.model.longDescription =  failure.longDescription;
    this.model.region =  failure.region;
  }

  // Method in component class.
  addNewFailure(failure: Failure) {
    this.mode = 'create';
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
   this.failure.service = this.selectedService.id;
   this.failure.start_date = this.model.startDate;
   this.failure.end_date = this.model.endDate;
   this.failure.id = this.model.failureId;
   this.failure.region =  this.model.region;
   this.failure.description =  this.model.description;
   this.failure.longDescription =  this.model.longDescription;
   if(this.mode === "create"){
      this.failure.criteria = [
      this.failureService.formateCriteria(this.model.criteria)
   ];    
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
      queryString = "?cause=0&source=0&source=2&type=4&type=5";
  } else if(AppConstant.APP_PLANNED_MAINTENCE_FIXED_URL === this.selectedUrl){
     queryString = "?cause=1&source=0&source=2&type=4&type=5";
  } else if(AppConstant.APP_ARCHIVED_FAILURE_FIXED_URL === this.selectedUrl){
     queryString = "?cause=0&source=0&source=2&type=4&type=5&state=closed";
  } else if(AppConstant.APP_ARCHIVED_PLANNED_MAINTENCE_FIXED_URL === this.selectedUrl){
     queryString = "?cause=1&source=0&source=2&type=4&type=5&state=closed";
  }
  return queryString;
}

  emitApplicationLoadingBroadcast() {
    this.messageEvent.fireApplicationLoading(this.isApplicationLoading);
  }

}
