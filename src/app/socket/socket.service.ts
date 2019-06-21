import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

import { environment } from '../../environments/environment';
import {SocketEvent} from './socket.interface';

@Injectable()
export class SocketService {
  public client: Socket;

  constructor() {
  }

  private buildBrokerURL(): string {
    return `${environment.serviceEventSocket}`;
  }

  public initSocketClient(): void {
    this.client = io(this.buildBrokerURL());
  }

  public initConnection(): void {
    if (!this.isClientInitialized()) {
      this.initSocketClient();
    }
  }

  public requestDisconnect(): void {
    if (this.isClientConnected()) {
      this.client.disconnect();
    }
    this.client = undefined;
  }

  public isClientConnected(): boolean {
    return this.client && this.client.connected;
  }

  public isClientInitialized(): boolean {
    return !!this.client;
  }

  public joinToRoom(room: string): void {
    this.client.emit(SocketEvent.JOIN_ROOM, room);
  }

  public quitRoom(room: string): void {
    this.client.emit(SocketEvent.QUIT_ROOM, room);
  }
}
