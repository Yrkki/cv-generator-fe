import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from './services/data/data.service';

type PrintCallback = () => any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';

  _theme: string;
  set theme(value: string) {
    this.themeChanged(value);
  }
  get theme(): string {
    return this._theme;
  }

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.detectMedia(this.beforePrintHandler, this.afterPrintHandler);

    this.theme = undefined;
  }

  private themeChanged(theme: string) {
    document.getElementsByTagName('body')[0].style.backgroundImage =
      'url(' + this.dataService.getResourceUri('background.jpg', theme) + ')';
  }

  private beforePrintHandler = (): any => {
    this.theme = 'print';
  }

  private afterPrintHandler = (): any => {
    this.theme = undefined;
  }

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
