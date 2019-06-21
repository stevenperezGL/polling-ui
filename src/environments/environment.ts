// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const WS_RANDOMIZATION_FACTOR = 0.7;
export const WS_RECONNECT_DELAY = 30000;
export const WS_RECONNECT_TRIES = 3;
export const WS_SOCKET_PATH = 'https://polling-tool.herokuapp.com';
export const environment = {
  production: false,
  serviceEventSocket: WS_SOCKET_PATH + '/socket'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
