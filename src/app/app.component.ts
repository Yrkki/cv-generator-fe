import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs/operators';

import { ContextConfiguration } from './interfaces/context/context-configuration';

import { ThemeChangerService } from './services/theme-changer/theme-changer.service';
import { UiService } from './services/ui/ui.service';

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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  /** The application title */
  title = 'cv-generator-fe';

  /** Main element. */
  @ViewChild('main') main!: ElementRef<HTMLDivElement>;

  /** The app theme getter delegate */
  get theme(): string { return this.themeChangerService.theme; }
  /** The app theme setter delegate */
  @Input() set theme(value: string) { this.themeChangerService.theme = value; }

  /** The app theme background getter delegate */
  get themeBackground(): string { return this.themeChangerService.themeBackground; }
  /** The app theme background setter delegate */
  @Input() set themeBackground(value: string) { this.themeChangerService.themeBackground = value; }

  /** The default app theme */
  private get defaultTheme() { return ThemeChangerService.defaultTheme; }

  /** Preparations before printing. */
  private savedTheme = this.defaultTheme;

  /** The animation root element. */
  @ViewChild('animationRoot') animationRoot?: ElementRef;

  /**
   * Constructs the app.
   *
   * @param swUpdate The injected software updater.
   *
   * @param themeChangerService The theme changer service dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    private readonly uiService: UiService,

    private readonly themeChangerService: ThemeChangerService,
    private readonly swUpdate: SwUpdate,
  ) { }

  /** OnInit handler. */
  ngOnInit(): void {
    this.checkForUpdates();
  }

  /** AfterViewInit handler. */
  ngAfterViewInit(): void {
    this.Initialize();
    this.subscribeUiInvalidated();
  }

  /** Cleanup */
  ngOnDestroy() {
    this.unsubscribeUiInvalidated();
  }

  /** Subscribe events */
  private subscribeUiInvalidated() {
    this.uiService.uiInvalidated$.subscribe((uiInvalidated$) => {
      if (uiInvalidated$) {
        this.refreshUI();
      }
    });
  }

  /** Unsubscribe events */
  private unsubscribeUiInvalidated() {
    if (this.uiService.uiInvalidated$) {
      this.uiService.uiInvalidated$.unsubscribe();
    }
  }

  /** Refresh UI */
  private refreshUI() {
    this.theme = this.theme;
  }

  /** Check for updates. */
  private checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.pipe(take(1)).subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          this.windowReload();
        }
      });
    }
  }

  /** Initialization. */
  private Initialize(): void {
    this.detectMedia(this.beforePrintHandler, this.afterPrintHandler);

    // set last used theme or else the high contrast theme in case testing at CI servers
    this.theme = environment.CV_GENERATOR_AUDITING ? 'contrast_100' : this.theme;

    // transition out
    this.animationRoot?.nativeElement.addEventListener('beforeunload', () => {
      document.body.classList.add('animate-out');
    });
  }

  /**
   * Preparations before printing.
   */
  private beforePrintHandler = (): void => {
    const oldTtheme = this.theme;
    const newTtheme = 'print';

    // take better care when recording the old theme in case multiple changes have happened
    if (oldTtheme !== newTtheme) {
      this.savedTheme = oldTtheme;
    }
    this.theme = newTtheme;
    // tslint:disable-next-line: semicolon
  };

  /**
   * Preparations after printing.
   */
  private afterPrintHandler = (): void => {
    this.theme = this.savedTheme;
    // tslint:disable-next-line: semicolon
  };

  /**
   * Checks for media if print and not normal screen one.
   *
   * @param beforePrintHandler Callback used when before printing.
   * @param afterPrintHandler Callback used when after printing.
   */
  private detectMedia(beforePrintHandler: PrintCallback, afterPrintHandler: PrintCallback): void {

    if (globalThis.matchMedia) {
      const mediaQueryList = globalThis.matchMedia('print');
      mediaQueryList.addEventListener('change', (mql) => {
        if (mql.matches) {
          beforePrintHandler();
        } else {
          afterPrintHandler();
        }
      });
    }

    globalThis.onbeforeprint = beforePrintHandler;
    globalThis.onafterprint = afterPrintHandler;
  }

  /**
   * Nav state changed event handler.
   *
   * @param navStateConfiguration The new state configuration.
   */
  public navStateChanged(navStateConfiguration: ContextConfiguration): void {
    this.main.nativeElement.style.marginLeft = navStateConfiguration.width;
    this.main.nativeElement.style.backgroundColor = navStateConfiguration.backgroundColor;
  }

  /** Reload window delegate. */
  private windowReload() { this.uiService.windowReload(); }
}
