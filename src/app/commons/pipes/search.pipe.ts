import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Failure } from  '../../shared/models/failure.model';

@Pipe({
  name : 'failureListfilter',
})
 //return failures.filter(failure => failure.region.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
@Injectable()
export class SearchPipe implements PipeTransform {
  private isHidden:Boolean;
 transform(failures: Failure[], args: any[]): any {
   if(args != null && args.length > 0 ){
       return failures.filter(failure => {
            for (let field in args) {
                if ((failure.region != null && failure.region.toLowerCase().indexOf(args.toString().toLowerCase()) == 0)
                || (failure.type !== null && failure.type.toString().toLowerCase().indexOf(args.toString().toLowerCase()) == 0)
                || (failure.id !== null && failure.id.toString().toLowerCase().indexOf(args.toString().toLowerCase()) == 0)
                || (failure.state !== null && failure.state.toString().toLowerCase().indexOf(args.toString().toLowerCase()) == 0)
                || (failure.service !== null && failure.service.toString().toLowerCase().indexOf(args.toString().toLowerCase()) == 0))
                {
                    return true;
                }
            }
            return false;
        });
    }
    else {
      return failures;
    }
  
  }
}