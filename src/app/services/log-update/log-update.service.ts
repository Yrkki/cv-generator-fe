import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs/operators';

/**
 * The progressive web app update logger service.
 */
@Injectable({
  providedIn: 'root'
})
export class LogUpdateService {
  /**
   * Constructs the update logger.
   * ~constructor
   *
   * @param swUpdate The injected software updater.
   */
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.pipe(take(1)).subscribe((event) => {
      // console.log('Debug: current version is', event.current);
      // console.log('Debug: available version is', event.available);

      // console.log('Debug: [App] Update available: current version is', event.current, 'available version is', event.available);
      // let snackBarRef = this.snackBar.open('Newer version of the app is available', 'Refresh');

      // snackBarRef.onAction().pipe(take(1)).subscribe(() => {
      //   this.winRef.nativeWindow.location.reload()
      // });
    });
    swUpdate.activated.pipe(take(1)).subscribe((event) => {
      // console.log('Debug: old version was', event.previous);
      // console.log('Debug: new version is', event.current);
    });
  }
}
