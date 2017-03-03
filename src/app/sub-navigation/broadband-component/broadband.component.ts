import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'broadband-component',
  templateUrl: './broadband.component.html',
  styleUrls: ['./broadband.component.scss']
})
export class BroadbandComponent implements OnInit {
  public selectedUrl: String;

   constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {
      this.selectedUrl = router.url ;
  }

 ngOnInit() {
 }
}
