import { Injectable } from '@angular/core';
import { FailureTypes, Cause, Service, State, Source } from '../shared/models/index';
 
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
    getFailureTypes(): FailureTypes[] {
        return  this.failureTypes;
    }

    getFailureTypesByCause(selectedCause:number): FailureTypes[] {
        debugger;
         if(selectedCause == 1){
            return this.failureTypesByCause;
         }
         else {
            return this.failureTypes;
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
}