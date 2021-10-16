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
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

import { errorHandler } from '../error-handler/error-handler.service';
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
      .catch((err) => errorHandler.loggerErrorHandler(err));
  }

  /**
   * Report check.
   */
  private reportCheck() {
    logger.info('Debug: [App] checkForUpdate completed');
  }
}
