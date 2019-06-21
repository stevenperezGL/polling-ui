import { AuthTokenService } from '@app/core/auth/auth-token.service';
import { SocketService } from '@app/core/socket/socket.service';
import { environment, WS_RANDOMIZATION_FACTOR, WS_RECONNECT_DELAY, WS_RECONNECT_TRIES } from '@env/environment';
import { WSSState } from '@app/core/ws/wss.interface';
import { userReducers } from '@app/core/user/store/user.reducers';

import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

describe('SocketService', () => {
  let authTokenService: AuthTokenService;
  let socketService: SocketService;
  let fakeAccessToken: string;
  let brokerURL: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          user: userReducers,
        }),
      ],
      providers: [AuthTokenService, SocketService],
    });

    authTokenService = TestBed.get(AuthTokenService);
    socketService = TestBed.get(SocketService);

    socketService.publicFeatureFlags$ = of({ webSocketSecurity: true, socketService: true });
    socketService.setPublicFeatureFlags({ webSocketSecurity: false, socketService: false });

    socketService.initSocketClient();

    fakeAccessToken = 'asd123';
    brokerURL = `${environment.baseUrls.serviceEventSocket}/ws`;
    spyOn(authTokenService, 'getAccessToken').and.returnValue(fakeAccessToken);
  });

  it('should be created', () => {
    expect(socketService).toBeTruthy();
  });

  it('getClientConfig should return socket configuration', function() {
    const actual = socketService.getClientConfig();
    const expected = {
      path: '/socket/ws',
      brokerURL: brokerURL,
      reconnectionAttempts: WS_RECONNECT_TRIES,
      reconnectionDelay: WS_RECONNECT_DELAY,
      randomizationFactor: WS_RANDOMIZATION_FACTOR,
      transports: ['websocket'],
      query: { token: authTokenService.getAccessToken() },
    };

    expect(actual).toEqual(expected);
  });

  it("connect should set a new client when the client wasn't initialized", () => {
    socketService.publicFeatureFlags$ = of({ webSocketSecurity: true, socketService: true });
    spyOn(socketService, 'isClientConnected').and.returnValue(false);
    spyOn(socketService, 'handleClientStates').and.returnValue(() => {});

    socketService.requestConnect();

    expect(socketService.client).toBeTruthy();
  });

  it('should not set a connection when the flag socketService is false', () => {
    socketService.publicFeatureFlags$ = of({ webSocketSecurity: true, socketService: false });
    spyOn(socketService, 'handleClientStates').and.returnValue(() => {});

    socketService.requestConnect();

    expect(socketService.client.connected).toBeFalsy();
  });

  it("connect should call handleClientStates when the client wasn't initialized", () => {
    spyOn(socketService, 'isClientConnected').and.returnValue(false);
    spyOn(socketService, 'isClientInitialized').and.returnValue(false);
    spyOn(socketService, 'handleClientStates').and.returnValue(() => {});

    socketService.requestConnect();

    expect(socketService.handleClientStates).toHaveBeenCalled();
  });

  it('connect should NOT set a new Client and call handleClientStates when the client was initialized', () => {
    spyOn(socketService, 'isClientConnected').and.returnValue(true);
    spyOn(socketService, 'handleClientStates').and.returnValue(() => {});

    socketService.requestConnect();

    expect(socketService.client).not.toBeNull();
    expect(socketService.handleClientStates).not.toHaveBeenCalled();
  });

  it('onConnect should call emitOnConnect when client connects', () => {
    spyOn(socketService, 'emitOnConnect');
    socketService.handleClientStates();

    socketService.client.emit('connect');

    expect(socketService.emitOnConnect).toHaveBeenCalled();
  });

  it('onDisconnect should call emitOnDisconnect when client disconnects', () => {
    spyOn(socketService, 'emitOnDisconnect');
    socketService.handleClientStates();

    socketService.client.emit('disconnect');

    expect(socketService.emitOnDisconnect).toHaveBeenCalled();
  });

  it('onReconnectAttempt should call emitOnReconnectAttempt when client attempts to reconnect', () => {
    spyOn(socketService, 'emitOnReconnectAttempt');
    socketService.handleClientStates();

    socketService.client.emit('reconnect_attempt');

    expect(socketService.emitOnReconnectAttempt).toHaveBeenCalled();
  });

  it('disconnect should set socket client to undefined when the client is connected', () => {
    spyOn(socketService, 'isClientConnected').and.returnValue(true);

    socketService.requestDisconnect();

    expect(socketService.client).toBeUndefined();
  });

  it('disconnect should set socket client to undefined when the client is disconnected', () => {
    spyOn(socketService, 'isClientConnected').and.returnValue(false);

    socketService.requestDisconnect();

    expect(socketService.client).toBeUndefined();
  });

  it('emitOnReconnectAttempt should call dispatch because Token is not longer valid and security is enable when the socket is NOT able to connect', () => {
    socketService.publicFeatureFlags = { webSocketSecurity: true, socketService: true };
    spyOn(authTokenService, 'getValidAccessToken').and.returnValue(null);
    spyOn(socketService.store, 'dispatch');

    socketService.emitOnReconnectAttempt();

    expect(authTokenService.getValidAccessToken()).toBeNull();
    expect(socketService.store.dispatch).toHaveBeenCalled();
  });

  it('emitOnReconnectAttempt should not call dispatch when Token is not longer valid but security is disable ', () => {
    socketService.publicFeatureFlags = { webSocketSecurity: false, socketService: true };
    spyOn(authTokenService, 'getValidAccessToken').and.returnValue(null);
    spyOn(socketService.store, 'dispatch');

    socketService.emitOnReconnectAttempt();

    expect(authTokenService.getValidAccessToken()).toBeNull();
    expect(socketService.store.dispatch).not.toHaveBeenCalled();
  });

  it('emitOnConnect should emit the WSSState.CONNECTED state', () => {
    spyOn(socketService.state$, 'next');

    socketService.emitOnConnect();

    expect(socketService.state$.next).toHaveBeenCalledWith(WSSState.CONNECTED);
  });

  it('emitOnDisconnect should emit the WSSState.DISCONNECTED state', () => {
    spyOn(socketService.state$, 'next');
    spyOn(socketService.store, 'dispatch');
    socketService.emitOnDisconnect();

    expect(socketService.state$.next).toHaveBeenCalledWith(WSSState.DISCONNECTED);
  });
});
