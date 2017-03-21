import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface BroadcastEvent {
  key: any;
  data?: any;
}

export class Broadcaster {
  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  broadcast(key: any, data?: any) {
    this._eventBus.next({key, data});
  }

  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .filter(event => event.key === key)
      .map(event => <T>event.data);
  }
}


//examples

// registerStringBroadcast() {
//     this.broadcaster.on<string>('message')
//       .subscribe(message => {
//         this.message = message;
//         if (this._timer) {
//           clearTimeout(this._timer);
//         }
//         this._timer = setTimeout(() => {
//           this.message = '';
//           this._timer = null;
//         }, 3000);
//       });
//   }


//  registerTypeBroadcast() {
//     this.messageEvent.on()
//       .subscribe(message => {
//         this.message = message;
//         if (this._timer) {
//           clearTimeout(this._timer);
//         }
//         this._timer = setTimeout(() => {
//           this.message = '';
//           this._timer = null;
//         }, 3000);
//       });
//   }

  // emit() {
  //   // this.emitStringBroadcast();
  //   this.emitTypeBroadcast();
  // }

  // emitApplicationLoadingBroadcast() {
  //   this.messageEvent.fireApplicationLoading(this.isApplicationLoading);
  // }

  // emitStringBroadcast() {
  //   this.broadcaster.broadcast('message', 'Message from');
  // }

  // emitTypeBroadcast() {
  //   this.messageEvent.fire('Message from');
  // }