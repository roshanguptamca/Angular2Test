import { Injectable } from '@angular/core';
import { FailureTypes, Cause, Service, State, Source, Template } from '../shared/models/index';
import { ApiService } from '../_helpers/api.service';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
 
@Injectable()
export class ApplicationUtillService {
    constructor(
        private apiService: ApiService
    ){}
    failureTypes = [
        new FailureTypes(0,"broadband","Broadband",false),
        new FailureTypes(1,"geographical-broadband","Geographical Broadband",false),
        new FailureTypes(2,"customers-broadband","Customer ID Broadband",false),
        new FailureTypes(3,"generic","Generic",false),
        new FailureTypes(4,"fixed","PSTN-ISDN",false),
        new FailureTypes(5,"geographical-fixed","Geographical PSTN-ISDN",false),
        new FailureTypes(6,"mobile","Mobile",false),
        new FailureTypes(7,"fia-broadband","FIA Broadband",false),
        new FailureTypes(8,"services-broadband","Service ID Broadband",false),
        new FailureTypes(9,"customers-fixed","Customer ID Fixed",false)
    ];

     failureTypesByCause = [
        new FailureTypes(1,"geographical-broadband","Geographical Broadband",false),
        new FailureTypes(2,"customers-broadband","Customer ID Broadband",false),
        new FailureTypes(3,"generic","Generic",false),
        new FailureTypes(4,"fixed","PSTN-ISDN",false),
        new FailureTypes(5,"geographical-fixed","Geographical PSTN-ISDN",false),
        new FailureTypes(6,"mobile","Mobile",false),
        new FailureTypes(7,"fia-broadband","FIA Broadband",false),
        new FailureTypes(8,"services-broadband","Service ID Broadband",false),
        new FailureTypes(9,"customers-fixed","Customer ID Fixed",false)
    ];

    causes = [
        new Cause(0,"disturbance","Failure"),
        new Cause(1,"planned-maintenance","Planned maintenance")
    ];
    sources = [
        new Source(0,"gui","GUI"),
        new Source(1,"serviceguard","SERVICEGUARD"),
        new Source(1,"trendanalyser","TRENDANALYSER")
    ];

    services = [
        new Service(0,"I-TV"),
        new Service(1,"VoIP"),
        new Service(2,"Internet"),
        new Service(3,"MijnKPN"),
        new Service(4,"Webmail"),
        new Service(5,"Spotify"),
        new Service(6,"Other")
    ];

    states = [
        new State('STATE_NEW',"New"),
        new State('STATE_COLLECTING',"Collecting customers"),
        new State('STATE_PLANNED',"Planned maintenance"),
        new State('STATE_OPEN',"Open"),
        new State('STATE_AWAITING_APPROVAL',"Waiting for user approval (GUI)"),
        new State('STATE_NOTIFYING',"Notifying customers"),
        new State('STATE_CLOSED',"Failure closed"),
        new State('STATE_CLOSING_NOTIFICATION',"Notifying close failure")
    ];


    templates = {
        'broadband': [
            new Template(0,"FT0_Update", "Broadband")
        ],
        'geographical_broadband': [
            new Template(1,"FT1_Update", "Geographical Broadband")
        ],
        'customer_id': [
            new Template(2,"FT2_Update", "Customer ID")
        ],
        'generic': [
            new Template(3,"FT3_Update", "Generic")
        ],
        'pstn_isdn': [
            new Template(4,"FT4_Update", "PSTN/ISDN")
        ],
        'geographical_pstn_isdn': [
            new Template(5,"FT5_Update", "Geographical PSTN/ISDN")
        ],
        'mobile': [
            new Template(6,"FT6_Update", "Mobile")
        ],
        'fia_broadband': [
            new Template(7,"FT7_Update", "FIA Broadband")
        ],
        'service_id_broadband': [
            new Template(8,"FT8_Update", "Service ID Broadband")
        ]
        
    };
    getFailureTypes(): FailureTypes[] {
        return  this.failureTypes;
    }

    getFailureTypesByCause(selectedCause:any): FailureTypes[] {
         if(selectedCause == 1){
            return this.failureTypes;
            
         }
         else {
            return this.failureTypesByCause;
         }
    }

     getCauses(): Cause[] {
        return  this.causes;
    }

     getSources(): Source[] {
        return  this.sources;
    }

     getServices(): Service[] {
        return  this.services;
    }

     getStates(): State[] {
        return  this.states;
    }

     getTemplates(failureType): Template[] {
         if(failureType === 0){
            return  this.templates.broadband;
         }
        else if(failureType === 1){
            return  this.templates.geographical_broadband;
         }
         else if(failureType === 2){
            return  this.templates.customer_id;
         }
         else if(failureType === 3){
            return  this.templates.generic;
         }
         else if(failureType === 4){
            return  this.templates.pstn_isdn;
         }
         else if(failureType === 5){
            return  this.templates.geographical_pstn_isdn;
         }
         else if(failureType === 6){
            return  this.templates.mobile;
         }
         else if(failureType === 7){
            return  this.templates.fia_broadband;
         }
         else if(failureType === 8){
            return  this.templates.service_id_broadband;
         }
         else{
            return  null;
         }
    }

   getTemplateList(disturbance) {
       return this.apiService.getWithOptions("/disturbances/v1/notifications/templates/?action=update&disturbance="+disturbance, this.jwt());
   }
    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({
                'Authorization': 'Token ' + currentUser.token,
                'Content-Type': 'application/json'
            },
            );
            return new RequestOptions({ headers: headers });
        }
    }

}