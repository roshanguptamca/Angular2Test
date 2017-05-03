import { Injectable } from '@angular/core';
import { FailureTypes, Cause, Service, State, Source, Template } from '../shared/models/index';
 
@Injectable()
export class ApplicationUtillService {
    constructor(){}
    failureTypes = [
        new FailureTypes(0,"Broadband",false),
        new FailureTypes(1,"Geographical Broadband",false),
        new FailureTypes(2,"Customer ID",false),
        new FailureTypes(3,"Generic",false),
        new FailureTypes(4,"PSTN-ISDN",false),
        new FailureTypes(5,"Geographical PSTN-ISDN",false),
        new FailureTypes(6,"Mobile",false),
        new FailureTypes(7,"FIA Broadband",false),
        new FailureTypes(8,"Service ID Broadband",false)
    ];

     failureTypesByCause = [
        new FailureTypes(1,"Geographical Broadband",false),
        new FailureTypes(2,"Customer ID",false),
        new FailureTypes(3,"Generic",false),
        new FailureTypes(4,"PSTN-ISDN",false),
        new FailureTypes(5,"Geographical PSTN-ISDN",false),
        new FailureTypes(6,"Mobile",false),
        new FailureTypes(7,"FIA Broadband",false),
        new FailureTypes(8,"Service ID Broadband",false)
    ];

    causes = [
        new Cause(0,"Failure"),
        new Cause(1,"Planned maintenance")
    ];
    sources = [
        new Source(0,"SOURCE_GUI"),
        new Source(1,"SOURCE_SERVICEGUARD")
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

    getFailureTypesByCause(selectedCause:number): FailureTypes[] {
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
}