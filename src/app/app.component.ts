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
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { AppService } from './services/app/app.service';
import { ContextConfiguration } from './interfaces/context/context-configuration';

import { ThemeChangerService } from './services/theme-changer/theme-changer.service';
import { PersistenceService } from './services/persistence/persistence.service';

import { environment } from '../environments/environment';

/**
 * The main application component.
 * ~implements {@link OnInit}
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  /** The application title */
  public title = 'cv-generator-fe';

  /** Main element. */
  @ViewChild('main') public readonly main!: ElementRef<HTMLDivElement>;

  /** The animation root element. */
  @ViewChild('animationRoot') public readonly animationRoot!: ElementRef<HTMLDivElement>;

  /** Tinted getter. */
  public get tinted() {
    return this.persistenceService.getItem('tinted') === 'true';
  }

  /** Microprinted getter. */
  public get microprinted() {
    return this.persistenceService.getItem('microprinted') === 'true';
  }

  /** Context getter. */
  public get context() {
    return this.persistenceService.getItem('context') === 'true';
  }

  /** Preparations before printing. */
  private savedTheme = ThemeChangerService.defaultTheme;

  /**
   * Constructs the app.
   *
   * @param appService The апп service dependency.
   * @param themeChangerService The theme changer service dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    private readonly appService: AppService,
    private readonly themeChangerService: ThemeChangerService,
    private readonly persistenceService: PersistenceService,
  ) { }

  /** OnInit handler. */
  ngOnInit(): void {
    this.appService.tryCheckForUpdates();
  }

  /** AfterViewInit handler. */
  ngAfterViewInit(): void {
    this.Initialize();
    this.appService.subscribeUiInvalidated((uiInvalidated) => { this.refreshUI(uiInvalidated); });
  }

  /** Cleanup */
  ngOnDestroy() {
    this.appService.unsubscribeUiInvalidated();
  }

  /**
   * Nav state changed event handler.
   *
   * @param navStateConfiguration The new state configuration.
   */
  public onNavStateChanged(navStateConfiguration: ContextConfiguration): void {
    this.main.nativeElement.style.marginLeft = this.context ? navStateConfiguration.width : '0px';
    this.main.nativeElement.style.backgroundColor = this.tinted ? navStateConfiguration.backgroundColor : 'rgba(0,0,0,0)';
  }

  /** Refresh UI */
  private refreshUI(uiInvalidated: boolean) {
    if (uiInvalidated) {
      this.themeChangerService.theme = this.themeChangerService.theme;
    }
  }

  /** Initialization. */
  private Initialize(): void {
    this.appService.detectMedia(this.beforePrintHandler, this.afterPrintHandler);

    // set last used theme or else the high contrast theme in case testing at CI servers
    this.themeChangerService.theme = environment.CV_GENERATOR_AUDITING ? 'contrast_100' : this.themeChangerService.theme;

    // transition out
    // ~security: codacy: unsafe: ESLint_scanjs-rules_call__addEventListener
    this.animationRoot.nativeElement.addEventListener('beforeunload', this.onBeforeUnload, { passive: true });
  }

  /** Before unload event handler. */
  private onBeforeUnload(): void {
    document.body.classList.add('animate-out');
  }

  /**
   * Preparations before printing.
   */
  private beforePrintHandler = (): void => {
    const oldTheme = this.themeChangerService.theme;
    const newTheme = 'print';

    // take better care when recording the old theme in case multiple changes have happened
    if (oldTheme !== newTheme) {
      this.savedTheme = oldTheme;
    }
    this.themeChangerService.theme = newTheme;
    // tslint:disable-next-line: semicolon
  };

  /**
   * Preparations after printing.
   */
  private afterPrintHandler = (): void => {
    this.themeChangerService.theme = this.savedTheme;
    // tslint:disable-next-line: semicolon
  };
}
