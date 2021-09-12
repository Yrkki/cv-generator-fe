// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
// eslint-disable-next-line no-redeclare
/*global globalThis*/
import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs/operators';

import { UiService } from '../../services/ui/ui.service';

/** Print callback type to capture print-related events. */
type PrintCallback = () => void;

/**
 * A App service.
 */
@Injectable({
  providedIn: 'root'
})
export class AppService {
  /**
   * Constructs the App service.
   * ~constructor
   *
   * @param uiService The ui service injected dependency.
   * @param swUpdate The injected software updater.
   */
  constructor(
    private readonly uiService: UiService,
    private readonly swUpdate: SwUpdate,
  ) {
  }

  /**
   * Checks for media if print and not normal screen one.
   *
   * @param beforePrintHandler Callback used when before printing.
   * @param afterPrintHandler Callback used when after printing.
   */
  public detectMedia(beforePrintHandler: PrintCallback, afterPrintHandler: PrintCallback): void {
    if (globalThis.matchMedia) {
      const mediaQueryList = globalThis.matchMedia('print');
      // ~security: codacy: unsafe: ESLint_scanjs-rules_call__addEventListener
      mediaQueryList.addEventListener('change', (mql) => this.onDetectMedia(beforePrintHandler, afterPrintHandler, mql.matches));
    }

    globalThis.onbeforeprint = beforePrintHandler;
    globalThis.onafterprint = afterPrintHandler;
  }

  /** Subscribe events */
  public subscribeUiInvalidated(callback: (uiInvalidated: boolean) => void) {
    this.uiService.uiInvalidated$.subscribe((uiInvalidated) => callback(uiInvalidated));
  }

  /** Unsubscribe events */
  public unsubscribeUiInvalidated() {
    if (this.uiService.uiInvalidated$) {
      this.uiService.uiInvalidated$.unsubscribe();
    }
  }

  /** Try check for updates. */
  public tryCheckForUpdates(): void {
    if (this.swUpdate.isEnabled) { this.checkForUpdates(); }
  }

  /** Check for updates. */
  private checkForUpdates(): void {
    this.swUpdate.available.pipe(take(1)).subscribe(() => { this.onCheckForUpdates(); });
  }

  /** Check for updates handler. */
  private onCheckForUpdates(): void {
    if (confirm('New version available. Load New Version?')) {
      this.windowReload();
    }
  }

  /**
   * Checks for media if print and not normal screen one.
   *
   * @param beforePrintHandler Callback used when before printing.
   * @param afterPrintHandler Callback used when after printing.
   * @param mqlMatches Whether media query list event.
   */
  private onDetectMedia(beforePrintHandler: PrintCallback, afterPrintHandler: PrintCallback, mqlMatches: boolean) {
    if (mqlMatches) {
      beforePrintHandler();
    } else {
      afterPrintHandler();
    }
  }

  /** Reload window delegate. */
  private windowReload() { this.uiService.windowReload(); }
}
