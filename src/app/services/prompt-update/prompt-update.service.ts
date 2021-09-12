// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Injectable } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { take } from 'rxjs/operators';
import { UiService } from '../ui/ui.service';

import { errorHandler } from '../error-handler/error-handler.service';
import { logger } from '../logger/logger.service';

/**
 * The progressive web app update prompt service.
 */
@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {
  /**
   * Constructs the update prompt.
   * ~constructor
   *
   * @param swUpdate The injected software updater.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    private readonly swUpdate: SwUpdate,
    public readonly uiService: UiService,
  ) {
    swUpdate.available.pipe(take(1)).subscribe(this.onUpdateAvailableEvent);
  }

  /**
   * UpdateAvailableEvent handler.
   *
   * @param event The event to notify about.
   */
  private onUpdateAvailableEvent(event: UpdateAvailableEvent) {
    if (this.promptUser(event)) { this.activateUpdate(); }
  }

  /**
   * Prompt the user.
   *
   * @param _event The event to notify about.
   *
   * @returns User consent.
   */
  // tslint:disable-next-line: variable-name
  private promptUser(_event: UpdateAvailableEvent): boolean { return true; }

  /**
   * Activate update.
   */
  private activateUpdate() {
    this.swUpdate.activateUpdate()
      .then(this.reportUpdate)
      .catch((err) => errorHandler.loggerErrorHandler(err));
  }

  /**
   * Report update.
   */
  private reportUpdate() {
    logger.info('Debug: [App] activateUpdate completed');
    this.windowReload();
  }

  /** Reload window delegate. */
  public windowReload() { this.uiService.windowReload(); }
}
