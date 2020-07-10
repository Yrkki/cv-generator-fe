// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/** Development environment */
export const environment = {
  production: false,
  serverEndpointUri: 'http://192.168.1.6:3000',
  hosts: ['localhost', '192.168.1.2', '192.168.1.6', '192.168.99.100'],
  CV_GENERATOR_APPVEYOR_TOKEN: '',
  CV_GENERATOR_SKIP_REDIRECT_TO_HTTPS: '',

  CI: 'false',
  CV_GENERATOR_AUDITING: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
