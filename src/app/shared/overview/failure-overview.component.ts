import { Component } from '@angular/core';

@Component({
  selector: 'failure-overview',
  templateUrl: './failure-overview.component.html',
  styleUrls: ['./failure-overview.component.scss']
})
export class FailureOverviewComponent {
  today: number = Date.now();

   constructor() { }
}
