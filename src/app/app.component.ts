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
  public options = [];
  public secretKey : string;

  constructor(private socket: SocketService) {
    this.secretKey = localStorage.getItem('secretKey');
    this.socket.initConnection();
    this.socket.client.on(SocketEvent.CONNECTION, (msg) => {
      console.log('=========  CONNECTION  =========');
      console.log(msg);
      console.log('=====  End of CONNECTION>  =====');
    });

    this.socket.client.on(`${SocketEvent.GET_OPTIONS}-${this.secretKey}`, (response) => {
      this.options = JSON.parse(response);
      localStorage.setItem('options', response);
      console.log('options: ', this.options);
    });
  }

  ngOnInit() {
    this.getOptions(this.secretKey);
  }

  private getOptions(secretKey: string): void {
    this.socket.client.emit(SocketEvent.GET_OPTIONS, secretKey);
  }
  public getPollStatus() {
    const pollStatus = localStorage.getItem('pollStatus');
    return pollStatus ? pollStatus : '';
  }
}
