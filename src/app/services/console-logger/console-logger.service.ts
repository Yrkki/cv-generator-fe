// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ILogger } from '../../interfaces/logger/logger';

/**
 * Console logger service.
 * ~implements {@link ILogger}
 */
@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerService implements ILogger {
  /** Instance */
  private static sInstance: ConsoleLoggerService;
  /** Instance getter */
  public static get instance(): ConsoleLoggerService {
    if (!this.sInstance) {
      this.sInstance = new ConsoleLoggerService();
    }
    return this.sInstance;
  }

  /** Mechanism */
  public mechanism: ILogger = console;

  /** Log */
  public log(message?: any, ...optionalParams: any[]) {
    this.doLog(this.mechanism.log, this.format('log', message, ...optionalParams), 'grey');
  }
  /** Info */
  public info(message?: any, ...optionalParams: any[]) {
    this.doLog(this.mechanism.info, this.format('info', message, ...optionalParams), 'blue');
  }
  /** Debug */
  public debug(message?: any, ...optionalParams: any[]) {
    this.doLog(this.mechanism.debug, this.format('debug', message, ...optionalParams), 'green');
  }
  /** Warn */
  public warn(message?: any, ...optionalParams: any[]) {
    this.doLog(this.mechanism.warn, this.format('warning', message, ...optionalParams), 'yellowgreen');
  }
  /** Error */
  public error(message?: any, ...optionalParams: any[]) {
    this.doLog(this.mechanism.error, this.format('error', message, ...optionalParams), 'red');
  }

  /** Perform logging op */
  public doLog(logKind: (message?: any, ...optionalParams: any[]) => void, message: string, color: string) {
    if (!environment.CV_GENERATOR_FE_DEBUG) { return; }
    logKind(message, ...this.getFormatColor(color));
  }

  /** Format color */
  private getFormatColor(color: string) { return ['color: darkgrey', `color: ${color}`, 'color: grey', 'color: inherit']; }

  /** Format */
  private format(level: string, message?: any, ...optionalParams: any[]) {
    const now = new Date();

    let messageString: string = message?.toString() ?? '';

    // treat first qualifier substrings (max callersNumberMax) as optional parameters (function callers)
    const callersNumberMax = 2;
    const splitter = ': ';
    const parts = messageString.split(splitter);
    const callersNumber = Math.min(parts.length - 1, callersNumberMax);
    if (callersNumber > 0) {
      optionalParams = [...(parts.slice(0, callersNumber)), ...optionalParams];
      messageString = parts.slice(callersNumber).join(splitter);
    }

    const callers = optionalParams.map((_) => _ + splitter).join('');

    return `%c${now}%c ${level}:%c ${callers}%c${messageString}`;
  }
}
