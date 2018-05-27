import { Component, AfterViewInit } from '@angular/core';
import { DataService } from './services/data/data.service';

/** Print callback type to capture print-related events. */
type PrintCallback = () => any;

/**
 * THe Application component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  /** The app title */
  title = 'app';

  /** THe app theme */
  _theme: string;
  /** The app theme setter */
  set theme(value: string) {
    this.themeChanged(value);
  }
  /** The app theme getter */
  get theme(): string {
    return this._theme;
  }

  /**
   * Constructs the app.
   * @param dataService The data service dependency.
   */
  constructor(private dataService: DataService) { }

  /**
   * Initialization.
   */
  ngAfterViewInit() {
    this.detectMedia(this.beforePrintHandler, this.afterPrintHandler);

    this.theme = undefined;
  }

  /**
   * Responses when theme changed.
   * @param theme The new theme.
   */
  private themeChanged(theme: string) {
    document.getElementsByTagName('body')[0].style.backgroundImage =
      'url(' + this.dataService.getResourceUri('background.jpg', theme) + ')';
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
    this.theme = undefined;
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
      mediaQueryList.addListener(function (mql) {
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
