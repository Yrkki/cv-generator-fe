import { Component, Input, TemplateRef, HostListener, ViewChild, ElementRef, Injector } from '@angular/core';
import { take } from 'rxjs/operators';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { DataService } from '../../services/data/data.service';
import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';

import { GeneralTimelineEntry } from '../../classes/general-timeline-entry/general-timeline-entry';

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

  /** Filtered timeline events getter delegate. */
  protected get FilteredTimelineEvents(): GeneralTimelineEntry[] {
    return this.generalTimelineService.FilteredTimelineEvents;
  }
  /** Filtered timeline events setter delegate. */
  protected set FilteredTimelineEvents(value: GeneralTimelineEntry[]) {
    this.generalTimelineService.FilteredTimelineEvents = value;
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

  /** Decorations delegate. */
  public get decorations() { return this.portfolioComponent.decorations; }

  /** The component key */
  protected key = 'General Timeline';

  /** The common portfolio component injected dependency. */
  public portfolioComponent: PortfolioComponent;
  /** The data service injected dependency. */
  protected dataService: DataService;
  /** The general timeline service injected dependency. */
  protected generalTimelineService: GeneralTimelineService;

  /** A clickable element. */
  @ViewChild('clickable') clickable: ElementRef;

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(event) { this.beforeprint(); }

  /**
   * Constructs a General timeline component.
   * ~constructor
   * @param injector The dependency injector.
   */
  constructor(
    injector: Injector) {
    // console.log('Debug: GeneralTimelineComponent: constructor: constructing...');

    this.portfolioComponent = injector.get(PortfolioComponent);
    this.dataService = injector.get(DataService);
    this.generalTimelineService = injector.get(GeneralTimelineService);

    this.portfolioComponent.searchTokenChanged$.pipe(take(1)).subscribe(_ => this.onSearchTokenChanged(_));

    this.getGeneralTimeline();
  }

  /** Loads the general timeline. */
  private getGeneralTimeline(): void {
    this.dataService.getGeneralTimeline().pipe(take(1)).subscribe((generalTimeline) => {
      if (! this.portfolioComponent.isEmpty(generalTimeline)) {
        this.generalTimeline = generalTimeline;
        this.FilteredTimelineEvents = generalTimeline;
      }

      this.restoreToggle(document, this.key);
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
    if (data != null) {
      const chartConfiguration = this.generalTimelineService.addChart(data, this.FilteredTimelineEvents);
      chartConfiguration.options.scales.yAxes[0].ticks.fontSize = 11;

      // console.log('Debug: drawGeneralTimeline: data:', data, 'this.filteredTimelineEvents:', this.filteredTimelineEvents);
      this.portfolioComponent.drawChart(chartType, chartConfiguration);
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

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.portfolioComponent.keypress(event);
  }
}
