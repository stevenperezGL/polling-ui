import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from '../../socket/socket.service';
import {SocketEvent} from "../../socket/socket.interface";

@Component({
  selector: 'app-poll-settings',
  templateUrl: './poll-settings.component.html',
  styleUrls: ['./poll-settings.component.css']
})
export class PollSettingsComponent implements OnInit {

  public showSecretKey = false;
  public secretRoomKey: string;
  public secretInput: string;
  constructor( private socket: SocketService) {
  }

  ngOnInit() {
    this.socket.client.on(SocketEvent.CREATE_ROOM, (secretKey) => {
      console.log('=========  CREATE_ROOM  =========');
      console.log(secretKey);
      console.log('=====  End of CREATE_ROOM>  =====');
      this.secretRoomKey = secretKey;
    });
    this.socket.client.on(SocketEvent.JOIN_ROOM, (msg) => {
      console.log('=========  JOIN_ROOM  =========');
      console.log(msg);
      console.log('=====  End of JOIN_ROOM>  =====');
    });
  }

  public createRoom() {
    this.socket.client.emit(SocketEvent.CREATE_ROOM);
  }

  public joinPoll() {
    const payload = {
      userId: 'asdasd@!#@#@!',
      secretKey: this.secretRoomKey,
    };
    this.socket.client.emit(SocketEvent.JOIN_ROOM, JSON.stringify(payload));
  }
}
