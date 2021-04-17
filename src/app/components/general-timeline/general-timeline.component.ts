import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';
import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';

import { GeneralTimelineEntry } from '../../classes/general-timeline-entry/general-timeline-entry';
import { Indexable } from '../../interfaces/indexable';
import { ChartService } from '../../services/chart/chart.service';
import { HeaderComponent } from '../header/header.component';

/**
 * General timeline component.
 * ~implements {@link OnInit}
 * ~implements {@link OnDestroy}
 */
@Component({
  selector: 'app-general-timeline',
  templateUrl: './general-timeline.component.html',
  styleUrls: ['./general-timeline.component.scss']
})
export class GeneralTimelineComponent implements OnInit, OnDestroy {
  /** The chart element. */
  @ViewChild('canvas') canvas?: ElementRef;

  /** General timeline data. */
  public generalTimeline = new Array<GeneralTimelineEntry>();

  /** Filtered timeline events getter delegate. */
  public get FilteredTimelineEvents(): GeneralTimelineEntry[] {
    return this.generalTimelineService.FilteredTimelineEvents;
  }
  /** Filtered timeline events setter delegate. */
  public set FilteredTimelineEvents(value: GeneralTimelineEntry[]) {
    this.generalTimelineService.FilteredTimelineEvents = value;
    this.drawGeneralTimeline();
  }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }
  /** Filtered delegate. */
  public get filtered() { return this.portfolioService.filtered; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.uiService.linkToThisText; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.decorations; }

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
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(event: Event) { this.beforeprint(); }

  /**
   * Constructs a General timeline component.
   * ~constructor
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param generalTimelineService The general timeline service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public entitiesService: EntitiesService,
    protected chartService: ChartService,
    protected inputService: InputService,
    protected uiService: UiService,
    protected persistenceService: PersistenceService,
    protected dataService: DataService,
    protected generalTimelineService: GeneralTimelineService
    ) {
    // console.log('Debug: GeneralTimelineComponent: constructor: constructing...');
  }

  /** Subscription */
  ngOnInit() {
    this.searchTokenSubscription = this.portfolioService.searchTokenChanged$.subscribe((_: string) => this.onSearchTokenChanged(_));

    this.getGeneralTimeline();
  }

  /** Cleanup */
  ngOnDestroy() {
    this.searchTokenSubscription?.unsubscribe();
  }

  /** Loads the general timeline. */
  private getGeneralTimeline(): void {
    this.dataService.getGeneralTimeline().pipe(take(1)).subscribe((generalTimeline) => {
      if (!this.portfolioService.isEmpty(generalTimeline)) {
        this.generalTimeline = generalTimeline;
        this.FilteredTimelineEvents = generalTimeline;
      }

      this.persistenceService.restoreToggle(document, this.key);
    });
  }

  /** Search token changed event handler. */
  private onSearchTokenChanged(value: string) {
    this.FilteredTimelineEvents = this.calcFilteredTimelineEvents();
  }

  /** The resize event handler */
  private resize() {
    this.generalTimelineService.resize(this.canvas);
  }

  /** The beforeprint event handler */
  private beforeprint() {
    this.resize();
  }

  /** Draws a general timeline chart */
  public drawGeneralTimeline(): void {
    const chartType = this.key;
    const data = this.generalTimeline;
    const chartConfiguration = this.generalTimelineService.addChart(data, this.FilteredTimelineEvents);
    const scales = chartConfiguration?.options?.scales;
    if (scales != null) {
      if (scales.xAxes?.[0]?.ticks != null) {
        scales.xAxes[0].ticks.fontSize = 8;
      }
      if (scales.yAxes?.[0]?.ticks != null) {
        scales.yAxes[0].ticks.lineHeight = 0.5;
        scales.yAxes[0].ticks.fontSize = 8;
      }
    }

    // console.log('Debug: drawGeneralTimeline: data:', data, 'this.filteredTimelineEvents:', this.filteredTimelineEvents);
    this.chartService.drawChart(chartType, chartConfiguration);
  }

  /**
   * Calculates the filtered general timeline entries for the current search context.
   *
   * @returns The filtered general timeline entries for the current search context.
   */
  private calcFilteredTimelineEvents(): GeneralTimelineEntry[] {
    if (typeof this.generalTimeline === 'undefined') { return []; }

    const retVal = ([] as GeneralTimelineEntry[]).concat(
      this.calcFilteredTimelineEventsPart(this.filtered.ProfessionalExperience, ['Experience']),
      this.calcFilteredTimelineEventsPart(this.filtered.Education, ['Education']),
      this.calcFilteredTimelineEventsPart(this.filtered.Accomplishments, ['Certification', 'Accomplishment']),
      this.calcFilteredTimelineEventsPart(this.filtered.Publications, ['Publication']),
      this.calcFilteredTimelineEventsPart(this.filtered.Projects, ['Project'])
    );

    // console.log('Debug: calcFilteredTimelineEvents', retVal);
    return retVal;
  }

  /**
   * Calculates the filtered general timeline parts for a given type and the current search context.
   *
   * @param arrFiltered The array to filter.
   * @param types The general timeline entry types.
   *
   * @returns The filtered general timeline parts for a given type and the current search context.
   */
  private calcFilteredTimelineEventsPart(arrFiltered: Indexable[], types: Array<string>): GeneralTimelineEntry[] {
    const outArray = new Array<GeneralTimelineEntry>();

    for (const timelineEvent of this.generalTimeline.filter((_) => types.includes(_.Type))) {
      for (const filtered of arrFiltered) {
        if (filtered.Id === timelineEvent.Id) {
          outArray.push(timelineEvent);
          break;
        }
      }
    }

    return outArray;
  }

  /**
   *  Whether the general timeline is defined.
   *
   * @returns Whether the general timeline is defined.
   */
  generalTimelineDefined(): boolean {
    return this.portfolioService.jsonDefined(this.generalTimeline);
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.uiService.tabName(key);
  }

  /** Save toggle delegate. */
  saveToggle(event: MouseEvent) {
    this.persistenceService.saveToggle(event);
  }

  /** Restore toggle delegate. */
  private restoreToggle(document: Document, typeName: string) {
    this.persistenceService.restoreToggle(document, typeName);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }
}
