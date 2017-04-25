import { Injectable } from '@angular/core';
import {NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';


@Injectable()
export class YaraUtilsService {
    constructor( private datePipe: DatePipe) {}
    isDateEquals(dateOne:any, dateTwo: any){
     var dateTowTime = new Date(this.datePipe.transform(dateTwo, "yyyy-MM-dd HH:mm:ss")).getTime();
     let dateOneTime = dateOne.getTime();
     return dateTowTime === dateOneTime;
    }
}