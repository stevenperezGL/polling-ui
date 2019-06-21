export const WS_PATH = '/socket/ws';
export const WS_RANDOMIZATION_FACTOR = 0.7;
export const WS_RECONNECT_DELAY = 30000;
export const WS_RECONNECT_TRIES = 3;
export const WS_SOCKET_PATH = 'https://polling-tool.herokuapp.com';

export const environment = {
  production: true,
  serviceEventSocket: WS_SOCKET_PATH + '/socket'
};
