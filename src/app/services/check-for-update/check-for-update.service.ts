import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

/**
 * The progressive web app update checker service.
 */
@Injectable()
export class CheckForUpdateService {

  /**
   * Constructs the update checker.
   * @constructor
   * @param swUpdate The injected software updater.
   */
  constructor(private swUpdate: SwUpdate) {
    interval(1 * 60 * 60).pipe(take(1)).subscribe(() => swUpdate.checkForUpdate()
      .then(() => {
        // console.log('[App] checkForUpdate completed');
      })
      .catch(err => {
        // console.error(err);
      })
    );
  }
}
