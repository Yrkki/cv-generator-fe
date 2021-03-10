import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { ChartService } from '../../services/chart/chart.service';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';
import { SorterKind } from '../../enums/sorter-kind.enum';

import { SorterComponent } from '../sorter/sorter.component';

/**
 * Spectrum component.
 * ~implements {@link OnInit}
 * ~implements {@link OnDestroy}
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-spectrum',
  templateUrl: './spectrum.component.html',
  styleUrls: ['./spectrum.component.scss']
})
export class SpectrumComponent implements OnInit, OnDestroy, AfterViewInit {
  /** The chart element. */
  @ViewChild('canvas') canvas?: ElementRef;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** Entity key. */
  @Input() key: any;

  /** Sorter. */
  @Input() sorter!: SorterComponent;

  /** PS focus threshold getter. */
  public get PsFocusThreshold() {
    return Number.parseInt(this.persistenceService.getItem('PsFocusThreshold') ?? '30', 10);
  }
  /** PS focus threshold setter. */
  public set PsFocusThreshold(value) {
    this.persistenceService.setItem('PsFocusThreshold', value.toString());
  }

  /** Tag cloud display mode. */
  public TagCloudDisplayMode = TagCloudDisplayMode;

  /** Search token subscription. */
  private searchTokenSubscription: Subscription | undefined;

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(event: Event) { this.beforeprint(); }

  /**
   * Constructs a Spectrum component.
   * ~constructor
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param chartService The chart service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public inputService: InputService,
    public uiService: UiService,
    public persistenceService: PersistenceService,
    public chartService: ChartService) {
  }

  /** Subscription */
  ngOnInit() {
    this.searchTokenSubscription = this.portfolioService.searchTokenChanged$.subscribe((_: string) => this.onSearchTokenChanged(_));
  }

  /** Cleanup */
  ngOnDestroy() {
    this.searchTokenSubscription?.unsubscribe();
  }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    this.persistenceService.restoreToggle(document, this.key);
    if (this.key === 'Country') {
      this.persistenceService.restoreToggle(document, this.key + ' Index');
      this.persistenceService.restoreToggle(document, this.key + ' Map');
    }
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

  /** Get frequencies cache delegate. */
  getFrequenciesCache(propertyName: string): any[] {
    if (this.portfolioService.checkToggleCollapsed(propertyName)) { return []; }

    return this.portfolioService.getFrequenciesCache(propertyName);
  }

  /** Chart height. */
  get chartHeight(): number {
    let height = 350;

    if (!this.simpleChart) {
      const frequencies = this.getFrequenciesCache(this.key);
      if (frequencies) {
        height = 650 + frequencies.length * 6;
      }
    }

    return height;
  }

  /** Chart width. */
  get chartWidth(): number {
    let width = 2300;

    if (!this.simpleChart) {
      const frequencies = this.getFrequenciesCache(this.key);
      if (frequencies) {
        width = this.chartHeight + Math.ceil(frequencies.length / (this.chartHeight / 25)) * 100;
      }
    }

    return width;
  }

  /** Whether a simple chart should be used. */
  get simpleChart(): boolean {
    return this.portfolioService.tagCloud === TagCloudDisplayMode.both;
  }

  /**
   * Draws a frequencies chart.
   * @param caller The caller function identification.
   */
  private async drawFrequenciesChart(caller: any) {
    // console.log('Debug: In drawFrequenciesChart:', caller);

    const data = this.portfolioService.getFrequenciesCache(this.key);

    this.chartService.refreshCharts();
    this.chartService.drawChart(this.key, this.chartService.addChart(data));
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    const tagCloudEmphasis = this.portfolioService.controller(SorterKind[SorterKind.Spectrum]).tagCloudEmphasis;
    return this.uiService.getFrequencyStyle(frequency, tagCloudEmphasis);
  }

  /** Remaining collection. */
  public remaining(collection: any[] = this.getFrequenciesCache(this.key)): any[] {
    return this.portfolioService.remaining(collection, undefined, SorterKind[SorterKind.Spectrum]);
  }
}
