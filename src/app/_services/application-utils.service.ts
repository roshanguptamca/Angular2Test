import { Injectable } from '@angular/core';
import { FailureTypes, Cause, Service, State, Source } from '../shared/models/index';
 
@Injectable()
export class ApplicationUtillService {
    constructor(){}
    failureTypes = [
        new FailureTypes(0,"TYPE_BROADBAND"),
        new FailureTypes(1,"TYPE_GEOGRAPHICAL_BROADBAND"),
        new FailureTypes(2,"TYPE_CUSTOMER_ID"),
        new FailureTypes(3,"TYPE_GENERIC"),
        new FailureTypes(4,"TYPE_FIXED"),
        new FailureTypes(5,"TYPE_GEOGRAPHICAL_FIXED"),
        new FailureTypes(6,"TYPE_MOBILE"),
        new FailureTypes(7,"TYPE_FIA_BROADBAND"),
        new FailureTypes(8,"TYPE_SERVICE_ID")
    ];

    causes = [
        new Cause(0,"CAUSE_DISTURBANCE"),
        new Cause(1,"CAUSE_PLANNED_MAINTENANCE")
    ];
    sources = [
        new Source(0,"SOURCE_GUI"),
        new Source(1,"SOURCE_SERVICEGUARD")
    ];

    services = [
        new Service(0,"SERVICE_ITV"),
        new Service(1,"SERVICE_VOIP"),
        new Service(2,"SERVICE_INTERNET"),
        new Service(3,"SERVICE_MIJNKPN"),
        new Service(4,"SERVICE_WEBMAIL"),
        new Service(5,"SERVICE_VAS"),
        new Service(6,"SERVICE_NO_ACCESS")
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