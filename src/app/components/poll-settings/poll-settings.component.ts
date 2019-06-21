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
  }

  public joinRoom() {
    console.log('Join Room -> Secret key: ' + this.secretInput);
  }

  public createRoom() {
    this.socket.joinToRoom(SocketEvent.CREATE_ROOM);
    this.socket.client.on(SocketEvent.CREATE_ROOM, (msg) => {
      console.log('=========  msg  =========');
      console.log(msg);
      console.log('=====  End of msg>  =====');
    });
  }
}
