// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { Injectable } from '@angular/core';
import { SwUpdate, VersionEvent, VersionReadyEvent } from '@angular/service-worker';
import { filter, take } from 'rxjs/operators';
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
    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .pipe(take(1))
      .subscribe(this.onUpdateAvailableEvent);
  }

  /**
   * UpdateAvailableEvent handler.
   *
   * @param event The event to notify about.
   */
  private onUpdateAvailableEvent(event: VersionEvent) {
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
  private promptUser(_event: VersionEvent): boolean { return true; }

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
