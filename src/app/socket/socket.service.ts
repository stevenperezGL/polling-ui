import { Injectable, Injector } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, Subscription } from 'rxjs';
import Socket = SocketIOClient.Socket;

import { environment, WS_PATH, WS_RANDOMIZATION_FACTOR, WS_RECONNECT_DELAY, WS_RECONNECT_TRIES } from '../../environments/environment';
import {SocketEvent} from './socket.interface';

@Injectable()
export class SocketService {
  public client: Socket;

  constructor() {
  }

  private buildBrokerURL(): string {
    return `${environment.serviceEventSocket}`;
  }

  public getClientConfig() {
    return {
      path: WS_PATH,
      brokerURL: this.buildBrokerURL(),
      reconnectionAttempts: WS_RECONNECT_TRIES,
      reconnectionDelay: WS_RECONNECT_DELAY,
      randomizationFactor: WS_RANDOMIZATION_FACTOR,
      transports: ['websocket']
    };
  }

  public initSocketClient(): void {
    const options = this.getClientConfig();
    this.client = io(this.buildBrokerURL(), options);
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

  public leaveRoom(room: string): void {
    this.client.emit(SocketEvent.LEAVE_ROOM, room);
  }
}
