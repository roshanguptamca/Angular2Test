import { Pipe,PipeTransform } from '@angular/core';
// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'valueByKeyPipe',
})
export class ValueByKeyPipe implements PipeTransform {
    transform(value:any, args:any):string {
        if (value && typeof value != undefined && value != "") {
            return args[value].value;
        }
        else {
            return value;
        }
    }
}