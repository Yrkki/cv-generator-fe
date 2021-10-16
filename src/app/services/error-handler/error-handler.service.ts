// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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

import { logger } from '../logger/logger.service';

/**
 * ErrorHandler service.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  /** Instance */
  private static sInstance: ErrorHandlerService;
  /** Instance getter */
  public static get instance(): ErrorHandlerService {
    if (!this.sInstance) {
      this.sInstance = new ErrorHandlerService();
    }
    return this.sInstance;
  }

  /**
   * Constructs the error handler service.
   * ~constructor
   */
  constructor(
  ) {
  }

  /** Global error handler */
  public globalErrorHandler(err: any, silent = false) {
    if (silent) {
      this.silentErrorHandler();
    } else {
      this.loggerErrorHandler(err);
    }
  }

  /** Silent error handler */
  // tslint:disable-next-line: variable-name
  public silentErrorHandler(_err?: any) {
    /* continue regardless of error */
  }

  /** Logger error handler */
  public loggerErrorHandler(err: any) {
    logger.error(err);
  }
}

/** Error handler service alias. */
export const errorHandler = ErrorHandlerService.instance;
