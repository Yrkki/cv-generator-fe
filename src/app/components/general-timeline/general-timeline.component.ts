import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EngineService } from '../../services/engine/engine.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';
import { ChartService } from '../../services/chart/chart.service';

import { HeaderComponent } from '../header/header.component';

/**
 * General timeline component.
 * ~implements {@link OnInit}
 * ~implements {@link AfterViewInit}
 * ~implements {@link OnDestroy}
 */
@Component({
  selector: 'app-general-timeline',
  templateUrl: './general-timeline.component.html',
  styleUrls: ['./general-timeline.component.scss']
})
export class GeneralTimelineComponent implements OnInit, AfterViewInit, OnDestroy {
  /** The chart element. */
  @ViewChild('canvas') canvas?: ElementRef;

  /** Entities delegate. */
  public get entities() { return this.portfolioService.model.portfolioModel.entities; }

  /** The component key */
  public key = 'General Timeline';

  /** Header component. */
  @ViewChildren(HeaderComponent) headerComponents?: QueryList<HeaderComponent>;

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Search token subscription. */
  private searchTokenSubscription: Subscription | undefined;

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  // tslint:disable-next-line: variable-name
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(_event: Event) { this.resize(); }

  /**
   * Constructs a General timeline component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param generalTimelineService The general timeline service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly engine: EngineService,
    protected readonly chartService: ChartService,
    protected readonly persistenceService: PersistenceService,
    protected readonly generalTimelineService: GeneralTimelineService
  ) {
  }

  /** Subscription */
  ngOnInit() {
    this.searchTokenSubscription = this.engine.searchService.searchTokenChanged$.subscribe((_: string) => {
      this.engine.model.filtered.TimelineEvents = this.engine.filterGeneralTimelineService.calcFilteredTimelineEvents();
      this.drawGeneralTimeline();
    });
  }

  /** Cleanup */
  ngOnDestroy() {
    this.searchTokenSubscription?.unsubscribe();
  }

  /** Initialization */
  ngAfterViewInit() {
    setTimeout(() => {
      this.persistenceService.restoreToggle(document, this.key);
      this.drawGeneralTimeline();
    });
  }

  /** The resize event handler */
  private resize() {
    this.generalTimelineService.resize(this.canvas);
  }

  /** Draws a general timeline chart */
  public drawGeneralTimeline(): void {
    const chartType = this.key;
    const data = this.engine.model.portfolioModel.generalTimeline;
    const chartConfiguration = this.generalTimelineService.addChart(data, this.engine.model.filtered.TimelineEvents);
    // tslint:disable-next-line: no-non-null-assertion
    const scales = chartConfiguration!.options!.scales;
    // tslint:disable-next-line: no-non-null-assertion
    scales!.x!.ticks!.font = { size: 8 };
    // tslint:disable-next-line: no-non-null-assertion
    scales!.y!.ticks!.font = { size: 8, lineHeight: 0.5 };

    this.chartService.drawChart(chartType, chartConfiguration);
  }

  /**
   *  Whether the general timeline is defined.
   *
   * @returns Whether the general timeline is defined.
   */
  public generalTimelineDefined(): boolean {
    return this.portfolioService.jsonDefined(this.engine.model.portfolioModel.generalTimeline);
  }
}
