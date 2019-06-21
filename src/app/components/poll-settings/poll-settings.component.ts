import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from '../../socket/socket.service';

@Component({
  selector: 'app-poll-settings',
  templateUrl: './poll-settings.component.html',
  styleUrls: ['./poll-settings.component.css']
})
export class PollSettingsComponent implements OnInit {

  public showSecretKey = false;
  public secretRoomKey: string;
  public secretInput: string;
  constructor( private socketService: SocketService) {
  }

  ngOnInit() {
  }

  public createRoom() {
    this.secretRoomKey = 'XADDASAAKLKSD0';
    this.showSecretKey = !this.showSecretKey;
  }

  public joinRoom() {
    console.log('Join Room -> Secret key: ' + this.secretInput);
  }
}
