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
    this.checkForUpdateSubscribe(1 * 30 * 1000);
  }

  /**
   * Check for update subscription subscibe.
   *
   * @param period The scheduling interval size in milliseconds.
   */
  private checkForUpdateSubscribe(period: number) {
    interval(period).pipe(take(1)).subscribe((n) => this.onCheckForUpdateEvent(n));
  }

  /**
   * Check for update handler.
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
