import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'failure-page',
  templateUrl: './failure.component.html',
   styleUrls: ['./failure.component.scss']
})
export class FailureComponent implements OnInit {
  authType: String = '';
  title: String = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.url.subscribe(data => {
      
    });
  }

}
