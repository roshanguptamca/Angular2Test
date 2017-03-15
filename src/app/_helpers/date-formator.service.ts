import { Injectable } from '@angular/core';
import {NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateFormatorSerice {
    tempDate: Date;
    constructor() {
       
    }

    formatDate(date: any) {
        if(date == null){
            return "";
        }
        else {
            this.tempDate.setDate(date.year);
            this.tempDate.setMonth(date.month);
            this.tempDate.setFullYear(date.year);
            return this.tempDate;
        }
    }
   
}