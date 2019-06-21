import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { SocketEvent } from '../../socket/socket.interface';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css']
})
export class PollVoteComponent implements OnInit {

  @Input() options: [];

  public selectedOption : string;
  public disabled : boolean = false;

  constructor(private socket: SocketService) { 

  }

  ngOnInit() {
  }

  private submitVote() : void {
    this.disabled = true;
    console.log('selected option: ', this.selectedOption);
    this.socket.client.emit(SocketEvent.SUBMIT_VOTE, this.selectedOption, localStorage.getItem('secretKey'));
  }

}
