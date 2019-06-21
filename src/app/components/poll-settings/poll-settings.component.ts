import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from '../../socket/socket.service';
import {SocketEvent} from '../../socket/socket.interface';

@Component({
  selector: 'app-poll-settings',
  templateUrl: './poll-settings.component.html',
  styleUrls: ['./poll-settings.component.css']
})
export class PollSettingsComponent implements OnInit {

  public showSecretKey = false;
  public secretRoomKey: string;
  public secretInput: string;
  public pollType = 'Fibonacci';
  @Input()
  public userId: string;
  private options = {
    votingMethod: 'Fibonacci',
    action: '',
    secretKey: ''
  };
  constructor( private socket: SocketService) {
  }

  ngOnInit() {
    this.initListenCreateRoom();
  }

  private initListenQuitRoom(secretKey: string) {
    this.socket.client.on(`${SocketEvent.QUIT_ROOM}-${secretKey}`, (msg) => {
      console.log('=========  QUIT_ROOM  =========');
      console.log(msg);
      console.log('=====  End of QUIT_ROOM>  =====');
    });
  }

  private initListenCreateRoom() {
    this.socket.client.on(SocketEvent.CREATE_ROOM, (secretKey) => {
      this.secretRoomKey = secretKey;
      this.showSecretKey = true;
      localStorage.setItem('secretKey', secretKey);
      console.log('=========  CREATE_ROOM  =========');
      console.log(secretKey);
      console.log('=====  End of CREATE_ROOM>  =====');
      this.listenEvents(secretKey);
    });
  }

  private initListenJoinPoll(secretKey: string) {
    this.socket.client.on(`${SocketEvent.JOIN_ROOM}-${secretKey}`, (msg) => {
      // Example {"roomId":"028a8360-9474-11e9-8f64-6f1b60dcd850","userId":null,"connectedUsers":2}
      const joinResponse = JSON.parse(msg);
      localStorage.setItem('connectedUsers', joinResponse.connectedUsers);
      console.log('=========  JOIN_ROOM  =========');
      console.log(msg);
      console.log('=====  End of JOIN_ROOM>  =====');
    });
  }

  private initListenPollAction(secretKey: string) {
    this.socket.client.on(`${SocketEvent.POLL_ACTIONS}-${secretKey}`, (msg) => {
      console.log('=========  POLL_ACTIONS  =========');
      console.log(msg);
      console.log('=====  End of POLL_ACTIONS>  =====');
      const message: any = JSON.parse(msg);

      switch (message.action) {
        case 'start-poll':
          console.log('llego un start poll');
          break;
        case 'reveal-poll':
          console.log('llego un reveal-poll');
          break;
        default:
          console.log('que torta llego: ' + message.action);
      }
    });
  }

  public listenEvents(secretKey: string) {
    this.initListenPollAction(secretKey);
    this.initListenJoinPoll(secretKey);
    this.initListenQuitRoom(secretKey);
  }

  public joinRoom() {
    const joinPayload = {
      userId: this.userId,
      secretKey: this.secretInput
    };
    this.listenEvents(this.secretInput);
    this.socket.client.emit(SocketEvent.JOIN_ROOM, JSON.stringify(joinPayload));
  }

  public createRoom() {
    this.socket.client.emit(SocketEvent.CREATE_ROOM);
  }

  public revealPoll() {
    this.options.action = 'reveal-poll';
    this.options.votingMethod = this.pollType;
    this.options.secretKey = this.secretInput;
    this.socket.client.emit(SocketEvent.POLL_ACTIONS, JSON.stringify(this.options));
  }

  public startPoll() {
    this.options.action = 'start-poll';
    this.options.votingMethod = this.pollType;
    this.options.secretKey = this.secretInput;
    this.socket.client.emit(SocketEvent.POLL_ACTIONS, JSON.stringify(this.options));
  }
}
