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
  @Input()
  public pollType = 'Fibonacci';
  private options = {
    votingMethod: 'Fibonacci',
    action: '',
    secretKey: ''
  };
  constructor( private socket: SocketService) {
  }

  ngOnInit() {
  }

  public joinRoom() {
    this.socket.client.emit(SocketEvent.JOIN_ROOM, JSON.stringify(this.secretInput));
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
