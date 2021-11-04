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
// eslint-disable-next-line no-redeclare
/*global globalThis*/
import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

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
    const updatesAvailable = this.swUpdate.versionUpdates.pipe(
      filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'),
      map((event) => event));
    updatesAvailable.pipe(take(1)).subscribe((event) => { this.onCheckForUpdates(event); });
  }

  /** Check for updates handler. */
  private onCheckForUpdates(event: VersionReadyEvent): void {
    const message = `New version available.
Update from version ${event.currentVersion.hash} to ${event.latestVersion.hash}?

${event.latestVersion.appData ?? ''}`
      .trim();
    if (confirm(message)) {
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
