import {Component, OnInit} from '@angular/core';
import {SocketService} from './socket/socket.service';
import {SocketEvent} from './socket/socket.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'polling-ui';
  public userId = localStorage.getItem('userId');

  constructor(private socket: SocketService) {
    this.socket.initConnection();
    this.socket.client.on(SocketEvent.CONNECTION, (msg) => {
      console.log('=========  CONNECTION  =========');
      console.log(msg);
      console.log('=====  End of CONNECTION>  =====');
    });
  }

  ngOnInit() {
    this.initListenCreateRoom();
  }
  private initListenCreateRoom() {
    this.socket.client.on(SocketEvent.CONNECTION, (msg) => {
      console.log('llego un start poll');
    });
  }
}
