import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SharedService {
    
    private parkingType = new Subject<string[]>();
    parkingType$ = this.parkingType.asObservable();
    
    ParkingType(jsonData){
     console.log(jsonData);
      this.parkingType.next(jsonData);
    }
    
} 
