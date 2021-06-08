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
