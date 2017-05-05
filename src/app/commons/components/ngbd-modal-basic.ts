import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Template, Failure } from '../../shared/models/index';
import { MessageEvent } from '../../commons/message-event';
import { FailureService, ApplicationUtillService } from '../../_services/index';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: 'ngbd-modal-basic.html'
})
export class NgbdModalBasic implements OnInit {
  closeResult: string;
  public templateList: Template[] = [];
  selectedTemplate: Template;
  isApplicationLoading: boolean = true;
  errors: string;
  successMessage: any;
  allTempletList:any;
  disabledSend:boolean = true;

  @Input('selectedfailure') selectedfailure: any;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private modalService: NgbModal,
    private applicationUtillService: ApplicationUtillService,
    private messageEvent: MessageEvent,
    private failureService: FailureService,
    private router: Router
  ) { }

  ngOnInit() {
     
  }

  onChangeTemplate(newvalue) {
    if(newvalue != -1){
      this.disabledSend = false;
      for (var index in this.templateList) { 
              if(this.templateList[index].id === Number(newvalue)){
                this.selectedTemplate = this.templateList[index];
              }
          }
    }
  }

  //call this wherever you needed to close modal
  private closeModal(): void {
    //this.closeBtn.nativeElement.click();
    document.getElementById("closeBtn").click();
  }

  open(content) {
    let tempList: Template[] = [];
    this.templateList.push(new Template(-1,"Temp","Choose here"));
    this.selectedTemplate = this.templateList[0];
    this.getTemplateList();
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
      return `with: ${reason}`;
    }
  }

  // Method in component class
  updateNotification() {
    var that = this;
    this.isApplicationLoading = true;
    this.emitApplicationLoadingBroadcast();
    this.failureService.updateNotification(this.selectedfailure, this.selectedTemplate.id)
      .subscribe(successResponse => {
        console.log(successResponse);
        this.successMessage = successResponse;
        this.closeModal();
      },
      error => {
        //this.closeModal();
        if (error.detail === "Invalid token." || error.detail === "Time-Out") {
          this.redirectToLogin();
        } else if (error.detail != null && error.detail === 'INVALID_TRANSITION') {
          this.errors = error.detail;
          this.isApplicationLoading = false;
          this.emitApplicationLoadingBroadcast();
          // this.closeModal();
        }
        else {
          this.errors = error;
          this.isApplicationLoading = false;
          this.emitApplicationLoadingBroadcast();
          //this.closeModal();
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

 getTemplateList() {
    // get TemplateList from secure api end point
    let tempList: Template[] = [];
    tempList.push(new Template(-1,"temp","Choose here"));
    this.selectedTemplate = tempList[0];
    this.isApplicationLoading = true;
    this.emitApplicationLoadingBroadcast();
    this.errors = "";
    this.applicationUtillService.getTemplateList(this.selectedfailure.type)
      .subscribe(allTemplets => {
        this.allTempletList = allTemplets;
        for (var index in allTemplets) { 
              if(this.selectedfailure.type === allTemplets[index].disturbance){
                tempList.push(new Template( allTemplets[index].id,allTemplets[index].description,allTemplets[index].name));
              }
          }
        this.templateList = tempList;
        this.isApplicationLoading = false;
        this.emitApplicationLoadingBroadcast();
      },
      error => {
        console.error(error);
        if (error.detail === "Invalid token." || error.detail === "Time-Out") {
          this.redirectToLogin();
        } else {
          // todo
        }
        this.isApplicationLoading = false;
        this.emitApplicationLoadingBroadcast();
      },
      () => {
        this.isApplicationLoading = false;
        this.emitApplicationLoadingBroadcast();
      });
  }

}