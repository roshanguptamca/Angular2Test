import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   links = [
          {"id": 1,
            "url": "#",
            "title": "Informatie & Bestellen",
            "urlTitle": "informatie-&-bestellen",
            "hideSidenav": false,
            "hideMegamenu": false
          },
          {"id": 1,
            "url": "#",
            "title": "Informatie & Bestellen",
            "urlTitle": "informatie-&-bestellen",
            "hideSidenav": false,
            "hideMegamenu": false
          },{"id": 1,
            "url": "#",
            "title": "Informatie & Bestellen",
            "urlTitle": "informatie-&-bestellen",
            "hideSidenav": false,
            "hideMegamenu": false
          },{"id": 1,
            "url": "#",
            "title": "Informatie & Bestellen",
            "urlTitle": "informatie-&-bestellen",
            "hideSidenav": false,
            "hideMegamenu": false
          }
   ];
  
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

  }
}
