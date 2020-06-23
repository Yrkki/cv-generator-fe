import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from './services/data/data.service';
import { ThemeChangerService } from './services/theme-changer/theme-changer.service';
import { SwUpdate } from '@angular/service-worker';

import AppThemeConfigJSON from './app.theme.config.json';

import { environment } from '../environments/environment';

/** Print callback type to capture print-related events. */
type PrintCallback = () => any;

/**
 * THe Application component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  /** The app title */
  title = 'app';

  /** The default app theme */
  private readonly defaultTheme = 'default';

  /** App theme config. */
  public get AppThemeConfig() { return AppThemeConfigJSON; }

  /** The app theme setter */
  set theme(value: string) {
    localStorage.setItem('theme', value);
    this.themeChanged(value);
  }
  /** The app theme getter */
  get theme(): string {
    return localStorage.getItem('theme');
  }

  /**
   * Constructs the app.
   * @param dataService The data service dependency.
   * @param themeChangerService The theme changer service dependency.
   * @param swUpdate The injected software updater.
   */
  constructor(
    private dataService: DataService,
    private themeChangerService: ThemeChangerService,
    private swUpdate: SwUpdate) { }

  /** Checks for updates */
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }

  /**
   * Initialization.
   */
  ngAfterViewInit() {
    this.detectMedia(this.beforePrintHandler, this.afterPrintHandler);

    // set last used theme or else the high contrast theme in case testing at CI servers
    this.theme = environment.CV_GENERATOR_AUDITING ? 'contrast_100' : (this.theme || this.defaultTheme);
  }

  /**
   * Theme changed handler.
   * @param theme The new theme.
   */
  private themeChanged(theme: string) {
    document.getElementsByTagName('body')[0].style.backgroundImage =
      'url(' + this.dataService.getResourceUri('background.jpg', theme) + ')';

    this.themeChangerService.initContrastEnhancer(theme, this.AppThemeConfig);
  }

  /**
   * Preparations before printing.
   */
  private beforePrintHandler = (): any => {
    this.theme = 'print';
  }

  /**
   * Preparations after printing.
   */
  private afterPrintHandler = (): any => {
    this.theme = this.defaultTheme;
  }

  /**
   * Checks for media if print and not normal screen one.
   * @param beforePrintHandler Callback used when before printing.
   * @param afterPrintHandler Callback used when after printing.
   */
  private detectMedia(beforePrintHandler: PrintCallback, afterPrintHandler: PrintCallback) {
    const beforePrint = function () {
      beforePrintHandler();
    };
    const afterPrint = function () {
      afterPrintHandler();
    };

    if (window.matchMedia) {
      const mediaQueryList = window.matchMedia('print');
      mediaQueryList.addEventListener('change', function (mql) {
        if (mql.matches) {
          beforePrint();
        } else {
          afterPrint();
        }
      });
    }

    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
  }
}
