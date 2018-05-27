import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

/**
 * The progressive web app update logger service.
 */
@Injectable()
export class LogUpdateService {

  /**
   * Constructs the update logger.
   * @constructor
   * @param swUpdate The injected software updater.
   */
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);

      // console.log('[App] Update available: current version is', event.current, 'available version is', event.available);
      // let snackBarRef = this.snackBar.open('Newer version of the app is available', 'Refresh');

      // snackBarRef.onAction().subscribe(() => {
      //   this.winRef.nativeWindow.location.reload()
      // });
    });
    swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
}
