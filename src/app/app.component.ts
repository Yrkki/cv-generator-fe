import { Component, OnInit, AfterViewInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { DataService } from './services/data/data.service';
import { ThemeChangerService } from './services/theme-changer/theme-changer.service';
import { SwUpdate } from '@angular/service-worker';

import AppThemeConfigJSON from './app.theme.config.json';

import { environment } from '../environments/environment';

/** Print callback type to capture print-related events. */
type PrintCallback = () => void;

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
export class AppComponent implements OnInit, AfterViewInit {
  /** The application title */
  title = 'cv-generator-fe';

  /** The default app theme */
  private readonly defaultTheme = 'default';

  /** App theme config. */
  public get AppThemeConfig(): any { return AppThemeConfigJSON; }

  /** The app theme setter */
  set theme(value: string) {
    localStorage.setItem('theme', value);
    this.themeChanged(value);
  }
  /** The app theme getter */
  get theme(): string {
    return localStorage.getItem('theme') || this.defaultTheme;
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

  /** OnInit handler. */
  ngOnInit(): void {
    this.checkForUpdates();
  }

  /** AfterViewInit handler. */
  ngAfterViewInit(): void {
    this.Initialize();
  }

  /** Check for updates. */
  private checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.pipe(take(1)).subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          globalThis.location.reload();
        }
      });
    }
  }

  /** Initialization. */
  private Initialize(): void {
    this.detectMedia(this.beforePrintHandler, this.afterPrintHandler);

    // set last used theme or else the high contrast theme in case testing at CI servers
    this.theme = environment.CV_GENERATOR_AUDITING ? 'contrast_100' : (this.theme || this.defaultTheme);
  }

  /**
   * Theme changed handler.
   * @param theme The new theme.
   */
  private themeChanged(theme: string): void {
    document.getElementsByTagName('body')[0].style.backgroundImage =
      'url(' + this.dataService.getResourceUri('background.jpg', theme) + ')';

    this.themeChangerService.initContrastEnhancer(theme, this.AppThemeConfig);
  }

  /**
   * Preparations before printing.
   */
  private beforePrintHandler = (): void => {
    this.theme = 'print';
  }

  /**
   * Preparations after printing.
   */
  private afterPrintHandler = (): void => {
    this.theme = this.defaultTheme;
  }

  /**
   * Checks for media if print and not normal screen one.
   *
   * @param beforePrintHandler Callback used when before printing.
   * @param afterPrintHandler Callback used when after printing.
   */
  private detectMedia(beforePrintHandler: PrintCallback, afterPrintHandler: PrintCallback): void {
    const beforePrint = () => beforePrintHandler();
    const afterPrint = () => afterPrintHandler();

    if (globalThis.matchMedia) {
      const mediaQueryList = globalThis.matchMedia('print');
      mediaQueryList.addEventListener('change', (mql) => {
        if (mql.matches) {
          beforePrint();
        } else {
          afterPrint();
        }
      });
    }

    globalThis.onbeforeprint = beforePrint;
    globalThis.onafterprint = afterPrint;
  }
}
