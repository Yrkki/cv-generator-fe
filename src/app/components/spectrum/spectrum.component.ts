import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, HostListener, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EngineService } from '../../services/engine/engine.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { ChartService } from '../../services/chart/chart.service';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

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

  /** PS focus threshold getter. */
  public get PsFocusThreshold() {
    const key = `${TruncatorKind[TruncatorKind.Ps]}${TruncatorService.focusThresholdPropertyName}`;
    return Number.parseInt(
      this.persistenceService.getItem(key)
      ?? TruncatorService.focusThresholdDefaults.get(TruncatorKind.Ps)?.toString()
      ?? '30', 10
    );
  }
  /** PS focus threshold setter. */
  public set PsFocusThreshold(value) {
    const key = `${TruncatorKind[TruncatorKind.Ps]}${TruncatorService.focusThresholdPropertyName}`;
    this.persistenceService.setItem(key, value.toString());
  }

  /** Tag cloud display mode enum accessor. */
  public get TagCloudDisplayMode() { return TagCloudDisplayMode; }

  /** Search token subscription. */
  private searchTokenSubscription: Subscription | undefined;

  /** Responsive modelChanged subscription. */
  private responsiveModelChanged: Subscription | undefined;

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(event: Event) { this.beforeprint(); }

  /**
   * Constructs a Spectrum component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param chartService The chart service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly engine: EngineService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Spectrum)) public readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Ps)) public readonly truncatorService: TruncatorService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
    public readonly chartService: ChartService) {
  }

  /** Subscription */
  ngOnInit() {
    this.searchTokenSubscription = this.engine.searchService.searchTokenChanged$.subscribe((_: string) => this.onSearchTokenChanged(_));
    this.responsiveModelChanged = this.portfolioService.toolbarService.responsiveModelChanged$.subscribe(
      (_: { sourceEntityKey: string, value: boolean }) => this.onResponsiveToggled(_));
  }

  /** Cleanup */
  ngOnDestroy() {
    this.responsiveModelChanged?.unsubscribe();
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
  // tslint:disable-next-line: variable-name
  private onSearchTokenChanged(_value: string) {
    this.drawFrequenciesChart('onSearchTokenChanged');
  }

  /** Responsive toggled event handler. */
  private onResponsiveToggled(event: { sourceEntityKey: string, value: boolean }) {
    if (event.sourceEntityKey !== 'Project Summary') { return; }

    this.drawFrequenciesChart('onResponsiveToggled');
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
  public get chartHeight(): number {
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
  public get chartWidth(): number {
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
  public get simpleChart(): boolean {
    return this.portfolioService.toolbarService.tagCloud === TagCloudDisplayMode.both;
  }

  /**
   * Draws a frequencies chart.
   *
   * @param _caller The caller function identification.
   */
  // tslint:disable-next-line: variable-name
  private async drawFrequenciesChart(_caller: any) {
    // console.log('Debug: In drawFrequenciesChart:', caller);

    const data = this.portfolioService.getFrequenciesCache(this.key);

    this.chartService.refreshCharts();
    this.chartService.drawChart(this.key,
      this.chartService.addChart(data, this.portfolioService.toolbarService.responsive('Project Summary')));
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    return this.uiService.getFrequencyStyle(frequency, this.truncatorService.TagCloudEmphasis);
  }

  /** Truncated collection delegate. */
  public get truncated(): any[] {
    const collection = this.getFrequenciesCache(this.key);
    return this.truncatorService.truncated(this.sorterService.sorted(collection)) ?? [];
  }

  /** Remaining collection length. */
  public get remainingLength(): number {
    const collection = this.getFrequenciesCache(this.key);
    return this.truncatorService.remainingLength(collection);
  }
}
