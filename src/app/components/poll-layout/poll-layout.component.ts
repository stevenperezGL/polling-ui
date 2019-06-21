import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll-layout',
  templateUrl: './poll-layout.component.html',
  styleUrls: ['./poll-layout.component.css']
})
export class PollLayoutComponent implements OnInit {

  private connectedUsers: string;
  constructor() { }

  ngOnInit() {
  }

  public getConnectedUsers() {
    const connectedUser = localStorage.getItem('connectedUsers');
    return connectedUser ? connectedUser : 0;
  }
}
