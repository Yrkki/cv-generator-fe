import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

/**
 * The progressive web app update logger service.
 */
@Injectable({
  providedIn: 'root'
})
export class LogUpdateService {
  /**
   * Constructs the update logger.
   * ~constructor
   *
   * @param _swUpdate The injected software updater.
   */
  // tslint:disable-next-line: variable-name
  constructor(private _swUpdate: SwUpdate) {
  }
}
