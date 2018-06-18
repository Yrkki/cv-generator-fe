import { Component, Input, TemplateRef, HostListener, ViewChild, ElementRef } from '@angular/core';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { DataService } from '../../services/data/data.service';
import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';

import { GeneralTimelineEntry } from '../../classes/general-timeline-entry';

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
  @ViewChild('canvas') canvas: ElementRef;

  /** Header link template reference. */
  @Input() headerLink: TemplateRef<any>;

  /** Section counter template reference. */
  @Input() sectionCounter: TemplateRef<any>;

  /** General timeline data. */
  public generalTimeline = new Array<GeneralTimelineEntry>();

  /** Filtered timeline events for the current search context. */
  public _filteredTimelineEvents = [];
  /** Filtered timeline events getter. */
  private get filteredTimelineEvents(): GeneralTimelineEntry[] {
    return this._filteredTimelineEvents;
  }
  /** Filtered timeline events setter. */
  private set filteredTimelineEvents(value: GeneralTimelineEntry[]) {
    this._filteredTimelineEvents = value;
    this.drawGeneralTimeline();
  }

  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }

  /** Filtered professional experience delegate. */
  public get filteredProfessionalExperience() { return this.portfolioComponent.filteredProfessionalExperience; }
  /** Filtered education delegate. */
  public get filteredEducation() { return this.portfolioComponent.filteredEducation; }
  /** Filtered certifications delegate. */
  public get filteredCertifications() { return this.portfolioComponent.filteredCertifications; }
  /** Filtered accomplishments delegate. */
  public get filteredAccomplishments() { return this.portfolioComponent.filteredAccomplishments; }
  /** Filtered publications delegate. */
  public get filteredPublications() { return this.portfolioComponent.filteredPublications; }
  /** Filtered projects delegate. */
  public get filteredProjects() { return this.portfolioComponent.filteredProjects; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.portfolioComponent.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.portfolioComponent.linkToThisText; }

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(event) { this.beforeprint(); }

  /**
   * Constructs a General timeline component.
   * @constructor
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param dataService The data service injected dependency.
   * @param ganttChartService The gantt chart service injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent,
    private dataService: DataService,
    private generalTimelineService: GeneralTimelineService) {
    portfolioComponent.searchTokenChanged.subscribe(_ => this.onSearchTokenChanged(_));

    this.getGeneralTimeline();
  }

  /** Loads the general timeline. */
  private getGeneralTimeline(): void {
    this.dataService.getGeneralTimeline().subscribe((generalTimeline) => {
      // if (this.isEmpty(generalTimeline)) { return; }
      this.generalTimeline = generalTimeline;
      this.filteredTimelineEvents = generalTimeline;

      this.restoreToggle(document, 'General Timeline');
    });
  }

  /** Search token changed event handler. */
  private onSearchTokenChanged(value: string) {
    this.filteredTimelineEvents = this.calcFilteredTimelineEvents();
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
  public drawGeneralTimeline() {
    const chartType = 'General Timeline';
    const data = this.generalTimeline;
    if (data != null) {
      // console.log('drawGeneralTimeline: data:', data, 'this.filteredTimelineEvents:', this.filteredTimelineEvents);
      this.portfolioComponent.drawChart(chartType, this.generalTimelineService.addChart(data, this.filteredTimelineEvents));
    }
  }

  /**
   * Calculates the filtered general timeline entries for the current search context.
   *
   * @returns The filtered general timeline entries for the current search context.
   */
  private calcFilteredTimelineEvents(): GeneralTimelineEntry[] {
    if (typeof this.generalTimeline === 'undefined') { return []; }

    const retVal = [].concat(
      this.calcFilteredTimelineEventsPart(this.filteredProfessionalExperience, 'Experience'),
      this.calcFilteredTimelineEventsPart(this.filteredEducation, 'Education'),
      this.calcFilteredTimelineEventsPart(this.filteredCertifications, 'Certification'),
      this.calcFilteredTimelineEventsPart(this.filteredAccomplishments, 'Accomplishment'),
      this.calcFilteredTimelineEventsPart(this.filteredPublications, 'Publication'),
      this.calcFilteredTimelineEventsPart(this.filteredProjects, 'Project')
    );

    // console.log('calcFilteredTimelineEvents', retVal);
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
  private calcFilteredTimelineEventsPart(arrFiltered: any[], type: string): GeneralTimelineEntry[] {
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
    return this.portfolioComponent.jsonDefined(this.generalTimeline);
  }

  /** Count delegate. */
  count(collection: any, propertyName: string, splitter: string = ', '): number {
    return this.portfolioComponent.count(collection, propertyName, splitter);
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  /** Save toggle delegate. */
  saveToggle(event) {
    this.portfolioComponent.saveToggle(event);
  }

  /** Restore toggle delegate. */
  private restoreToggle(document, typeName, contentName?) {
    this.portfolioComponent.restoreToggle(document, typeName, contentName);
  }
}
