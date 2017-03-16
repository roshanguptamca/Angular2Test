import { Injectable } from '@angular/core';
import {NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';


@Injectable()
export class DateFormatorSerice {
datePipe = new DatePipe('en-US');
   constructor() {
       
    }

    format(date: NgbDateStruct, dateFormatString:string): string {
       	if (date === null) {
			return '';
		}
		try {
			return this.datePipe.transform(new Date(date.year, date.month - 1, date.day), dateFormatString);
		} catch (e) {
			return '';
		}
    }


    parsStringtoDate(date: string):Date {
       	if (date === null) {
			return null;
		}
		try {
			return new Date(date);
		} catch (e) {
			return null;
		}
    }
}