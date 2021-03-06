import { Component, OnInit } from '@angular/core';

import { FailureService } from '../_services/failure.service';
import { Failure } from '../shared/models/failure.model';

@Component({
  selector: 'failure-page',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.scss']
})
export class FailureComponent implements OnInit {
  authType: String = '';
  title: String = '';
  failureList: Failure[] = [];

  constructor(
    private failureService: FailureService
  ) { }

  ngOnInit() {
   // get failurs from secure api end point
    // this.failureService.getFailureList()
    //   .subscribe(failurs => {
    //     this.failureList = failurs;
    //   });

  }

}
