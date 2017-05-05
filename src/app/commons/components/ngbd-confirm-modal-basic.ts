import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Template, Failure, Errors } from '../../shared/models/index';
import { MessageEvent } from '../../commons/message-event';
import { FailureService, ApplicationUtillService } from '../../_services/index';
import { Broadcaster } from '../../commons/application-broadcaster.service';

@Component({
  selector: 'ngbd-confirm-modal-basic',
  templateUrl: 'ngbd-confirm-modal-basic.html'
})
export class NgbConfirmModalBasic implements OnInit {
  closeResult: string;
  public templateList: Template[] = [];
  selectedTemplate: Template;
  isApplicationLoading: boolean = true;
  successMessage: any;
  errors = new Errors();

  @Input('selectedfailure') selectedfailure: any;
  @Input('redirectUrl') redirectUrl: string;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private modalService: NgbModal,
    private applicationUtillService: ApplicationUtillService,
    private messageEvent: MessageEvent,
    private failureService: FailureService,
    private router: Router,
    private broadcaster: Broadcaster,
  ) { }

  ngOnInit() {

  }

    onChangeTemplate(newvalue) {
    this.selectedTemplate.value = newvalue;
  }

  //call this wherever you needed to close modal
  private closeModal(): void {
    //var that = this;
   document.getElementById("closeBtn").click();
  }

  open(confirmContent) {
    this.templateList = this.applicationUtillService.getTemplates(this.selectedfailure.type);
    this.selectedTemplate = this.templateList[0];

    this.modalService.open(confirmContent).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

   // Method in component class
  closeFailure() {
    this.isApplicationLoading = true;
    this.emitApplicationLoadingBroadcast();
    this.failureService.closeFailure(this.selectedfailure.id)
      .subscribe(newFailure => {
        console.log(newFailure);
        this.broadcaster.broadcast('message', 'failureClosed');
        this.closeModal();
      },
      error => {
        if (error.detail === "Invalid token." || error.detail === "Time-Out") {
          this.redirectToLogin();
        }
        else if (error.detail != null && error.detail === 'INVALID_TRANSITION') {
          this.errors.apiError[0] = error.detail;
          this.isApplicationLoading = false;
          this.emitApplicationLoadingBroadcast();
        }
        else {
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

  emitApplicationLoadingBroadcast() {
    this.messageEvent.fireApplicationLoading(this.isApplicationLoading);
  }
  // Method in component class
  redirectToLogin() {
    localStorage.removeItem('currentUser');
    this.isApplicationLoading = false;
    this.router.navigate(['/login']);
  }

}