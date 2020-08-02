import { Component, Input, TemplateRef, HostListener, ViewChild, ElementRef } from '@angular/core';
import { take } from 'rxjs/operators';

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

/**
 * General timeline component.
 */
@Component({
  selector: 'app-general-timeline',
  templateUrl: './general-timeline.component.html',
  styleUrls: ['./general-timeline.component.scss']
})
export class GeneralTimelineComponent {
  /** The chart element. */
  @ViewChild('canvas') canvas?: ElementRef;

  /** Header link template reference. */
  @Input() headerLink?: TemplateRef<any>;

  /** Section counter template reference. */
  @Input() sectionCounter?: TemplateRef<any>;

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

  /** Filtered professional experience delegate. */
  public get filteredProfessionalExperience() { return this.portfolioService.filteredProfessionalExperience; }
  /** Filtered education delegate. */
  public get filteredEducation() { return this.portfolioService.filteredEducation; }
  /** Filtered certifications delegate. */
  public get filteredCertifications() { return this.portfolioService.filteredCertifications; }
  /** Filtered accomplishments delegate. */
  public get filteredAccomplishments() { return this.portfolioService.filteredAccomplishments; }
  /** Filtered publications delegate. */
  public get filteredPublications() { return this.portfolioService.filteredPublications; }
  /** Filtered projects delegate. */
  public get filteredProjects() { return this.portfolioService.filteredProjects; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.uiService.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.uiService.linkToThisText; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.decorations; }

  /** The component key */
  public key = 'General Timeline';

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef;

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(event: Event) { this.beforeprint(); }

  /**
   * Constructs a General timeline component.
   * ~constructor
   * @param portfolioService The portfolio service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param generalTimelineService The general timeline service injected dependency.
   */
  constructor(
    protected portfolioService: PortfolioService,
    protected chartService: ChartService,
    protected entitiesService: EntitiesService,
    protected inputService: InputService,
    protected uiService: UiService,
    protected persistenceService: PersistenceService,
    protected dataService: DataService,
    protected generalTimelineService: GeneralTimelineService
    ) {
    // console.log('Debug: GeneralTimelineComponent: constructor: constructing...');

    this.portfolioService.searchTokenChanged$.pipe(take(1)).subscribe(_ => this.onSearchTokenChanged(_));

    this.getGeneralTimeline();
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
    if (chartConfiguration?.options?.scales?.yAxes?.[0]?.ticks != null) {
      chartConfiguration.options.scales.yAxes[0].ticks.fontSize = 11;
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
      this.calcFilteredTimelineEventsPart(this.filteredProfessionalExperience, 'Experience'),
      this.calcFilteredTimelineEventsPart(this.filteredEducation, 'Education'),
      this.calcFilteredTimelineEventsPart(this.filteredCertifications, 'Certification'),
      this.calcFilteredTimelineEventsPart(this.filteredAccomplishments, 'Accomplishment'),
      this.calcFilteredTimelineEventsPart(this.filteredPublications, 'Publication'),
      this.calcFilteredTimelineEventsPart(this.filteredProjects, 'Project')
    );

    // console.log('Debug: calcFilteredTimelineEvents', retVal);
    return retVal;
  }

  /**
   * Calculates the filtered general timeline parts for a given type and the current search context.
   *
   * @param arrFiltered The array to filter.
   * @param type The general timeline entry type.
   *
   * @returns The filtered general timeline parts for a given type and the current search context.
   */
  private calcFilteredTimelineEventsPart(arrFiltered: Indexable[], type: string): GeneralTimelineEntry[] {
    const outArray = new Array<GeneralTimelineEntry>();

    for (const timelineEvent of this.generalTimeline.filter(_ => _.Type === type)) {
      for (const filteredElement of arrFiltered) {
        if (filteredElement.Id === timelineEvent.Id) {
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
