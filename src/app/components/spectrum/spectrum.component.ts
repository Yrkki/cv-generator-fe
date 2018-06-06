import { Component, Input, AfterViewInit } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';

/**
 * Spectrum component.
 */
@Component({
  selector: 'app-spectrum',
  templateUrl: './spectrum.component.html',
  styleUrls: ['./spectrum.component.scss']
})
export class SpectrumComponent implements AfterViewInit {
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

  /**
   * Constructs a Spectrum component.
   * @constructor
   * @param portfolioComponent The common portfolio component injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent) {
  }

  /** Initialization */
  ngAfterViewInit() {
    this.restoreToggle(document, this.key);
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
    if (this.tagCloud === this.tagCloudDisplayMode.both) {
      return 350;
    }

    return 650 + (this.getFrequenciesCache(this.key).length) * 5;
  }

  /** Chart width. */
  get chartWidth(): number {
    if (this.tagCloud === this.tagCloudDisplayMode.both) {
      return 2300;
    }

    return this.chartHeight + Math.ceil((this.getFrequenciesCache(this.key).length) / (this.chartHeight / 25)) * 100;
  }
}
