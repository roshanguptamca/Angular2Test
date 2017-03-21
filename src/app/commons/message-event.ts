import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Broadcaster} from './application-broadcaster.service';

@Injectable()
export class MessageEvent {
  constructor(private broadcaster: Broadcaster) {}

  fire(data: string): void {
    this.broadcaster.broadcast(MessageEvent, data);
  }

  on(): Observable<string> {
    return this.broadcaster.on<string>(MessageEvent);
  }

 fireApplicationLoading(data: boolean): void {
    this.broadcaster.broadcast(MessageEvent, data);
  }

  onApplicationLoading(): Observable<boolean> {
    return this.broadcaster.on<boolean>(MessageEvent);
  }

}
