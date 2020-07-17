import { Injectable } from '@angular/core';
import { GeneralTimelineEntry } from '../../classes/general-timeline-entry/general-timeline-entry';

/**
 * A general timeline chart diagram model.
 * ~extends {@link GanttChartService}
 */
@Injectable({
  providedIn: 'root'
})
export class GeneralTimelineModel {
  /** Filtered timeline events for the current search context. */
  public filteredTimelineEvents: GeneralTimelineEntry[] = [];
  /** Filtered timeline events getter. */
  public get FilteredTimelineEvents(): GeneralTimelineEntry[] {
    return this.filteredTimelineEvents;
  }
  /** Filtered timeline events setter. */
  public set FilteredTimelineEvents(value: GeneralTimelineEntry[]) {
    this.filteredTimelineEvents = value;
  }
}
