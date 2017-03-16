import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FailureService, ApplicationUtillService } from '../../_services/index';
import { Failure, FailureTypes, Source, Cause, Errors } from '../../shared/models/index';

import { DateFormatorSerice } from '../../_helpers/index';
import { DatePipe } from '@angular/common';
import { AppConstant } from '../../commons/application.constant';
 
@Component({
  selector: 'broadband-component',
  templateUrl: './broadband.component.html',
  styleUrls: ['./broadband.component.scss']
})
export class BroadbandComponent implements OnInit {
  public selectedUrl: String;
  private searchString: string;
  errors = new Errors();
  failureList: Failure[] = [];
  model: any = {};
  failureTypesList: FailureTypes[];
  selectedFailureTypes: FailureTypes;
  sourceList: Source[];
  selectedsource: Source;
  causeList: Cause[];
  selectedCause: Cause;
  searchQuery: any[] = [];
  isApplicationLoading: Boolean = false;
  addOrUpdateMode: Boolean = false;
  dateModel: NgbDateStruct;
  dateString: string;
  tempdateString: string;
  failure: Failure;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private failureService: FailureService,
    private applicationUtillService: ApplicationUtillService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private dateFormatorSerice: DateFormatorSerice,
    private datePipe: DatePipe,
  ) {
    this.selectedUrl = router.url;
  }

  ngOnInit() {
    this.failureTypesList = this.applicationUtillService.getFailureTypes();
    this.selectedFailureTypes = this.failureTypesList[0];

    this.sourceList = this.applicationUtillService.getSources();
    this.selectedsource = this.sourceList[0];
    this.causeList = this.applicationUtillService.getCauses();
    this.selectedCause = this.causeList[0];
    // get dashboard data from secure api end point
    this.isApplicationLoading = true;
    this.getAllFailureList();
  }

 getAllFailureList() {
    // get failurs from secure api end point
    this.errors.reset();
    this.failureService.getFailureList()
      .subscribe(failurs => {
        this.failureList = failurs;
      },
      error => {
        console.error(error);
        debugger;
        if (error.detail === "Invalid token." || error.detail === "Time-Out") {
          this.redirectToLogin();
        }else {
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
  updateFailure(failure: Failure) {
    this.errors.reset();
    debugger;
    this.addOrUpdateMode = true;
    this.selectedCause = this.causeList[failure.cause];
    this.selectedFailureTypes = this.failureTypesList[failure.type];
    this.selectedsource =  this.sourceList[failure.source];
    this.model.endDate = this.setDefaultDate(this.dateFormatorSerice.parsStringtoDate(failure.end_date));
    this.onSelectDate(this.model.endDate);
    this.model.startDate = this.setDefaultDate(this.dateFormatorSerice.parsStringtoDate(failure.start_date));
    this.onSelectDate(this.model.startDate);
  }

  // Method in component class
  addNewFailure(failure: Failure) {
    this.errors.reset();
    debugger;
    this.addOrUpdateMode = true;
    this.model = {};
  }

  // Method in component class
  redirectToLogin() {
    localStorage.removeItem('currentUser');
    this.isApplicationLoading = false; this.addOrUpdateMode = false;
    this.router.navigate(['/login']);
  }


  createFailure() {
    this.isApplicationLoading = true;
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
      });
  }

  prepaireFailure() {
    debugger;
   this.failure = new Failure();
   this.failure.cause = this.selectedCause.id;
   this.failure.source = this.selectedsource.id;
   this.failure.type = this.selectedFailureTypes.id;
   this.failure.start_date = this.dateFormatorSerice.format(this.model.startDate,AppConstant.DB_DATE_FORMAT);
   this.failure.end_date = this.dateFormatorSerice.format(this.model.endDate,AppConstant.DB_DATE_FORMAT);
   this.failure.criteria = [
      "1062KS"
   ];
  }

  onSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.dateModel = date;   //needed for first time around due to ngModel not binding during ngOnInit call. Seems like a bug in ng2.
      this.dateString = this.ngbDateParserFormatter.format(date);
    }
  }

  setDefaultDate(date:Date): NgbDateStruct {
    if(date !== null) {
      let startYear = this.datePipe.transform(date, 'yyyy');
      let startMonth = this.datePipe.transform(date, 'MM');
      let startDay = this.datePipe.transform(date, 'dd');
      return this.ngbDateParserFormatter.parse(startYear + "-" + startMonth.toString() + "-" + startDay);
    }
    else {
      return this.ngbDateParserFormatter.parse(null);
    }
  }

}