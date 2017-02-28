import { Component, OnInit } from '@angular/core';


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
  ) {}

  ngOnInit() {

  }
}
