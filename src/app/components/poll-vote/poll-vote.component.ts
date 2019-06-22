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
  public secretKey : string;

  constructor(private socket: SocketService) { 
    this.secretKey = localStorage.getItem('secretKey');
  }

  ngOnInit() {
  console.log('event: ', `${SocketEvent.SUBMIT_VOTE}-${this.secretKey}`);
  this.socket.client.on(`${SocketEvent.SUBMIT_VOTE}-${this.secretKey}`, (response) => {
    console.log('LLEGAAAA ', response);
    const {option} = response;
    const votes = localStorage.getItem('votes') || '';
    const votesArray = Array.isArray(votes) ? votes : JSON.parse(votes);
    votesArray.push(option);
    localStorage.setItem('votes', JSON.stringify(votesArray));
  });

  this.socket.client.on(`${SocketEvent.GET_OPTIONS}-${this.secretKey}`, (response) => {
    this.options = JSON.parse(response);
    localStorage.setItem('options', response);
    console.log('options: ', this.options);
  });
  }

  private submitVote() : void {
    this.disabled = true;
    console.log('selected option: ', this.selectedOption);
    this.socket.client.emit(SocketEvent.SUBMIT_VOTE, this.selectedOption, this.secretKey);
    localStorage.setItem('pollStatus', '');
  }

}
