import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FailureService, ApplicationUtillService } from '../_services/index';
import { Failure, FailureTypes, Source, Cause, Errors, Service } from '../shared/models/index';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { DateFormatorSerice } from '../_helpers/index';
import { DatePipe } from '@angular/common';
import { AppConstant } from '../commons/application.constant';

export class MobileComponent {
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
  isApplicationLoading: Boolean = false;
  addOrUpdateMode: Boolean = false;
  dateModel: NgbDateStruct;
  dateString: string;
  tempdateString: string;
  failure: Failure;
  page: number = 1;
  private sub: any;


}