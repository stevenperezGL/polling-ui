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
  }

  private initListenQuitRoom(secretKey: string) {
    this.socket.client.on(`${SocketEvent.CONNECTION}-${secretKey}`, (msg) => {
      console.log('llego un start poll');
    });
  }
  private initListenJoinPoll(secretKey: string) {
    this.socket.client.on(`${SocketEvent.JOIN_ROOM}-${secretKey}`, (msg) => {
      console.log('llego un start poll');
    });
  }
  private initListenPollAction(secretKey: string) {
    this.socket.client.on(`${SocketEvent.POLL_ACTIONS}-${secretKey}`, (msg) => {
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
