import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css']
})
export class PollVoteComponent implements OnInit {

  @Input() options: [];

  constructor() { 
  }

  ngOnInit() {
  }

}
