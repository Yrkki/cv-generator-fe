import { Component, Input, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ChartService } from '../../services/chart/chart.service';

/**
 * Spectrum component.
 */
@Component({
  selector: 'app-spectrum',
  templateUrl: './spectrum.component.html',
  styleUrls: ['./spectrum.component.scss']
})
export class SpectrumComponent implements AfterViewInit {
  /** The chart element. */
  @ViewChild('canvas') canvas: ElementRef;

  /** Frequencies divider object delegate. */
  private get frequenciesDivider() { return this.portfolioComponent.frequenciesDivider; }

  /** Entity key. */
  @Input() key: any;

  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /** Tag cloud display mode delegate. */
  public get tagCloudDisplayMode() { return this.portfolioComponent.tagCloudDisplayMode; }

  /** Tag cloud delegate. */
  get tagCloud() {
    return this.portfolioComponent.tagCloud;
  }

  /** Search token getter delegate. */
  get searchToken(): string {
    return this.portfolioComponent.searchToken;
  }
  /** Search token setter delegate. */
  @Input() set searchToken(value: string) {
    this.portfolioComponent.searchToken = value;
  }

  /** Update search token delegate. */
  private updateSearchToken(newValue: string) { this.portfolioComponent.updateSearchToken(newValue); }

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(event) { this.beforeprint(); }

  /**
   * Constructs a Spectrum component.
   * @constructor
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param chartService The chart service injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    private chartService: ChartService) {
    portfolioComponent.searchTokenChanged.subscribe(_ => this.onSearchTokenChanged(_));
  }

  /** Initialization */
  ngAfterViewInit() {
    this.restoreToggle(document, this.key);
    this.drawFrequenciesChart('ngAfterViewInit');
  }

  /** Search token changed event handler. */
  private onSearchTokenChanged(value: string) {
    this.drawFrequenciesChart('onSearchTokenChanged');
  }

  /** The resize event handler */
  private resize() {
    this.chartService.resize(this.canvas);
  }

  /** The beforeprint event handler */
  private beforeprint() {
    this.resize();
  }

  /** Restore toggle delegate. */
  private restoreToggle(document, typeName, contentName?) {
    this.portfolioComponent.restoreToggle(document, typeName, contentName);
  }

  /** Get frequencies cache delegate. */
  getFrequenciesCache(propertyName: string): any[] {
    if (this.portfolioComponent.checkToggleCollapsed(propertyName)) { return []; }

    return this.portfolioComponent.getFrequenciesCache(propertyName);
  }

  /** Chart height. */
  get chartHeight(): number {
    let height: number;

    if (this.simpleChart()) {
      height = 350;
    } else {
      height = 650 + (this.getFrequenciesCache(this.key).length) * 6;
    }

    return height;
  }

  /** Chart width. */
  get chartWidth(): number {
    let width: number;

    if (this.simpleChart()) {
      width = 2300;
    } else {
      width = this.chartHeight + Math.ceil((this.getFrequenciesCache(this.key).length) / (this.chartHeight / 25)) * 100;
    }

    return width;
  }

  /** Whether a simple chart should be used. */
  private simpleChart() {
    return this.tagCloud === this.tagCloudDisplayMode.both;
  }

  /**
   * Draws a frequencies chart.
   * @param caller The caller function identification.
   */
  private async drawFrequenciesChart(caller) {
    // console.log('In drawFrequenciesChart:', caller);

    const data = this.portfolioComponent.getFrequenciesCache(this.key);
    if (data != null) {
      this.portfolioComponent.refreshCharts();
      this.portfolioComponent.drawChart(this.key, this.chartService.addChart(data));
    }
  }
}
