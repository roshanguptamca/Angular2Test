import { Component, OnInit } from '@angular/core';
import { Broadcaster } from './commons/application-broadcaster.service';
import { MessageEvent } from './commons/message-event';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  message: string;
  _timer: any;
  isApplicationLoading:boolean =  true;
  constructor(  private broadcaster: Broadcaster,
    private messageEvent: MessageEvent){
  }

 ngOnInit() {
   this.registerTypeBroadcast();
  }
  registerTypeBroadcast() {
    this.messageEvent.onApplicationLoading()
      .subscribe(message => {
        this.isApplicationLoading = message;
        if (this._timer) {
          clearTimeout(this._timer);
        }
        this._timer = setTimeout(() => {
          this.message = '';
          this._timer = null;
        }, 3000);
      });
  }

}
