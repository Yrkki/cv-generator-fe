// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { ILogger } from '../../interfaces/logger/logger';

/**
 * Logger class.
 * ~implements {@link ILogger}
 */
export class Logger implements ILogger {
  /** Log */
  public log(message?: any, ...optionalParams: any[]) { }

  /** Info */
  public info(message?: any, ...optionalParams: any[]) { }

  /** Debug */
  public debug(message?: any, ...optionalParams: any[]) { }

  /** Warn */
  public warn(message?: any, ...optionalParams: any[]) { }

  /** Error */
  public error(message?: any, ...optionalParams: any[]) { }
}
