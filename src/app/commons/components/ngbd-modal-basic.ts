import {Component, Input} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ApplicationUtillService } from '../../_services/application-utils.service';
import { Template } from '../../shared/models/index';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: 'ngbd-modal-basic.html'
})
export class NgbdModalBasic {
  closeResult: string;
  public templateList: Template[] = [];
  selectedTemplate: Template;

  @Input('selectedfailure') selectedfailure: any;
  constructor(private modalService: NgbModal, private applicationUtillService: ApplicationUtillService) {
      this.templateList = this.applicationUtillService.getTemplates();
      this.selectedTemplate = this.templateList[0];
  }

onChangeTemplate(newvalue){
    this.selectedTemplate = this.templateList[newvalue];
}

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}