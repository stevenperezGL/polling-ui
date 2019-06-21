import { Component } from '@angular/core';
import {SocketService} from "./socket/socket.service";
import {SocketEvent} from "./socket/socket.interface";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'polling-ui';

  constructor(private socket: SocketService) {
    this.socket.initConnection();
    this.socket.client.on(SocketEvent.CONNECTION, (msg) => {
      console.log('=========  CONNECTION  =========');
      console.log(msg);
      console.log('=====  End of CONNECTION>  =====');
    });
  }
}
