import { Pipe, PipeTransform } from "@angular/core";
import { ApplicationUtillService } from '../../_services/index';
import { Failure, FailureTypes } from '../../shared/models/index';
import * as _ from "lodash";

@Pipe({ name: 'guifailuretype' })
export class GuiFailureType implements PipeTransform {
    uiFailureTypesList: FailureTypes[];
    failureTypes:FailureTypes;
    constructor( private applicationUtillService: ApplicationUtillService) {
        this.uiFailureTypesList = this.applicationUtillService.getFailureTypesByCause(1);
    }
    transform(value: any) {
        if (value) {
          this.failureTypes =  _.find(this.uiFailureTypesList, function(o) { return o.key == value; });
            return this.failureTypes.value;
        }
        return value;
    }
}