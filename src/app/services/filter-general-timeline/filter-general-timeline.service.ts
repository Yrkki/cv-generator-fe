// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Injectable } from '@angular/core';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { GeneralTimelineEntry } from '../../classes/general-timeline-entry/general-timeline-entry';
import { Indexable } from '../../interfaces/indexable';

/**
 * A filter general timeline service.
 */
@Injectable({
  providedIn: 'root'
})
export class FilterGeneralTimelineService {
  /** General timeline data getter delegate. */
  private get generalTimeline(): GeneralTimelineEntry[] { return this.portfolioModel.generalTimeline; }

  /**
   * Constructs the FilterGeneralTimeline service.
   * ~constructor
   *
   * @param portfolioModel The portfolio model injected dependency.
   */
  constructor(
    private readonly portfolioModel: PortfolioModel,
  ) {
  }

  /**
   * Calculates the filtered general timeline entries for the current search context.
   *
   * @returns The filtered general timeline entries for the current search context.
   */
  public calcFilteredTimelineEvents(): GeneralTimelineEntry[] {
    const retVal = ([] as GeneralTimelineEntry[]).concat(
      this.calcFilteredTimelineEventsPart(this.portfolioModel.filtered.ProfessionalExperience, ['Experience']),
      this.calcFilteredTimelineEventsPart(this.portfolioModel.filtered.Education, ['Education']),
      this.calcFilteredTimelineEventsPart(this.portfolioModel.filtered.Accomplishments, ['Certification', 'Accomplishment']),
      this.calcFilteredTimelineEventsPart(this.portfolioModel.filtered.Publications, ['Publication']),
      this.calcFilteredTimelineEventsPart(this.portfolioModel.filtered.Projects, ['Project'])
    );

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
      if (arrFiltered.find((_) => _.Id === timelineEvent.Id)) {
        outArray.push(timelineEvent);
      }
    }

    return outArray;
  }
}
