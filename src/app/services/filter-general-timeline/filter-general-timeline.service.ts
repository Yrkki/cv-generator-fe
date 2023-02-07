// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { Injectable } from '@angular/core';

import { ModelModel } from '../../model/model/model.model';
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
  private get generalTimeline(): GeneralTimelineEntry[] { return this.model.generalTimeline; }

  /**
   * Constructs the FilterGeneralTimeline service.
   * ~constructor
   *
   * @param model The model injected dependency.
   */
  constructor(
    private readonly model: ModelModel,
  ) {
  }

  /**
   * Calculates the filtered general timeline entries for the current search context.
   *
   * @returns The filtered general timeline entries for the current search context.
   */
  public calcFilteredTimelineEvents(): GeneralTimelineEntry[] {
    const retVal = ([] as GeneralTimelineEntry[]).concat(
      this.calcFilteredTimelineEventsPart(this.model.filtered.ProfessionalExperience, ['Experience']),
      this.calcFilteredTimelineEventsPart(this.model.filtered.Education, ['Education']),
      this.calcFilteredTimelineEventsPart(this.model.filtered.Accomplishments, ['Certification', 'Accomplishment']),
      this.calcFilteredTimelineEventsPart(this.model.filtered.Publications, ['Publication']),
      this.calcFilteredTimelineEventsPart(this.model.filtered.Projects, ['Project'])
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
