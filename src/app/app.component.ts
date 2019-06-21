import {Component, OnInit} from '@angular/core';
import {SocketService} from './socket/socket.service';
import {SocketEvent} from './socket/socket.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'polling-ui';

  constructor(private socket: SocketService) {
    this.socket.initConnection();
    this.socket.client.on(SocketEvent.CONNECTION, (msg) => {
      console.log('=========  CONNECTION  =========');
      console.log(msg);
      console.log('=====  End of CONNECTION>  =====');
    });
  }

  ngOnInit() {
    this.initListenPollAction();
    this.initListenCreateRoom();
    this.initListenJoinPoll();
    this.initListenQuitRoom();
  }
  private initListenCreateRoom() {
    this.socket.client.on(SocketEvent.CONNECTION, (msg) => {
      console.log('llego un start poll');
    });
  }
  private initListenQuitRoom() {
    this.socket.client.on(SocketEvent.CONNECTION, (msg) => {
      console.log('llego un start poll');
    });
  }
  private initListenJoinPoll() {
    this.socket.client.on(SocketEvent.JOIN_ROOM, (msg) => {
      console.log('llego un start poll');
    });
  }

  private initListenPollAction() {
    this.socket.client.on(SocketEvent.POLL_ACTIONS, (msg) => {
      switch (msg.action) {
        case 'start-poll':
          console.log('llego un start poll');
          break;
        case 'reveal-poll':
          console.log('llego un reveal-poll');
          break;
        default:
          console.log('que torta llego: ' + msg.action);
      }
    });
  }
}
