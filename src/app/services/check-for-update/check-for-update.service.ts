import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { logger } from '../logger/logger.service';

/**
 * The progressive web app update checker service.
 */
@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {
  /**
   * Constructs the update checker.
   * ~constructor
   *
   * @param swUpdate The injected software updater.
   */
  constructor(private swUpdate: SwUpdate) {
    interval(1 * 60 * 60).pipe(take(1)).subscribe((n) => this.onCheckForUpdateEvent(n));
  }

  /**
   * CheckForUpdateEvent handler.
   *
   * @param _n The sequential number of times this event is being seen.
   */
  // tslint:disable-next-line: variable-name
  private onCheckForUpdateEvent(_n: number) {
    this.checkForUpdate();
  }

  /**
   * Check for update.
   */
  private checkForUpdate() {
    this.swUpdate.checkForUpdate()
      .then(this.reportCheck)
      .catch((err) => logger.error(err));
  }

  /**
   * Report check.
   */
  private reportCheck() {
    logger.info('Debug: [App] checkForUpdate completed');
  }
}
