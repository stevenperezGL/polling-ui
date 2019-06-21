/*
@ts-ignore
Client = MockSocketClient;
*/
import { WS_DEBUG, WS_HEARTBEAT_INCOMING, WS_HEARTBEAT_OUTGOING, WS_RECONNECT_DELAY } from '@env/environment';
import { Subject, of } from '../../../../node_modules/rxjs';
import { SocketState } from '@app/core/socket/socket.interface';

export class MockSocketClient {
  brokerURL: '';
  connected: false;
  shouldDebug: false;
  activate = () => {};
  onConnect = () => {
    this.debug();
  };
  onDisconnect = () => {};
  onWebSocketClose = () => {};
  deactivate = () => {};
  debug = () => {
    if (this.shouldDebug) {
      console.log('Log');
    }
  };
}

const event: Event = null;
export const mockCloseEvent: CloseEvent = {
  ...event,
  wasClean: false,
  code: 2,
  reason: 'Forced Close',
  initEvent: function() {},
  initCloseEvent: function() {},
};

export class MockSocketService {
  public client: SocketIOClient.Socket;
  public reconnectTries: number = 0;
  public state$ = new Subject<SocketState>();

  getClientConfig() {
    return {
      brokerURL: '/demo',
      debug: WS_DEBUG ? str => console.log(str) : () => {},
      reconnectDelay: WS_RECONNECT_DELAY,
      heartbeatIncoming: WS_HEARTBEAT_INCOMING,
      heartbeatOutgoing: WS_HEARTBEAT_OUTGOING,
    };
  }
  requestConnect() {
    this.state$.next(SocketState.CONNECTED);
  }
  handleClientStates() {}
  requestDisconnect() {}
  requestReconnect() {}
  emitBeforeConnect() {}
  emitOnConnect() {}
  emitOnDisconnect() {}
  isClientConnected = () => true;
  isClientInitialized = () => true;
  subscribe = () => of();
}
