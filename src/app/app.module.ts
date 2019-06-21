import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PollSettingsComponent } from './components/poll-settings/poll-settings.component';
import { PollVoteComponent } from './components/poll-vote/poll-vote.component';
import { PollChartComponent } from './components/poll-chart/poll-chart.component';
import { PollHeaderComponent } from './components/poll-header/poll-header.component';
import {FormsModule} from "@angular/forms";
import { PollLayoutComponent } from './components/poll-layout/poll-layout.component';
import {SocketService} from "./socket/socket.service";
import {SocketEvent} from "./socket/socket.interface";

@NgModule({
  declarations: [
    AppComponent,
    PollSettingsComponent,
    PollVoteComponent,
    PollChartComponent,
    PollHeaderComponent,
    PollLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private socket: SocketService) {
    this.socket.initConnection();
  }
}
