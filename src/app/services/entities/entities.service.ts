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

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { GeneralTimelineService } from '../../services/general-timeline/general-timeline.service';
import { EntitiesModel } from '../../model/entities/entities.model';
import { UiService } from '../../services/ui/ui.service';

import { ExcelDateFormatterService } from '../excel-date-formatter/excel-date-formatter.service';

import { Indexable } from '../../interfaces/indexable';

/**
 * A entities service.
 */
@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  /** Entities delegate. */
  public get entities() { return this.portfolioService.model.portfolioModel.entities; }

  /**
   * Constructs the entities service.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param generalTimelineService The general timeline service injected dependency.
   * @param uiService The UI service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param entitiesModel The entities model injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public generalTimelineService: GeneralTimelineService,
    public uiService: UiService,
    private excelDateFormatterService: ExcelDateFormatterService,
    private entitiesModel: EntitiesModel
  ) {
  }

  /** Formatted count value. */
  public getCountValueFormatted(key: string): string {
    if (!key) { return ''; }
    const countValue = this.getCountValue(key);
    return countValue > 0 ? `(${countValue})` : '';
  }

  /** Count cache, aggregation or fixed collection length value. */
  public getCountValue(key: string): number {
    const cache = this.entitiesModel.countCache;

    // amend specific fixed count
    this.entitiesModel.countCache['Reference architecture'] = 2;

    let cacheValue = cache[key];
    if (cacheValue > 0) { return cacheValue; }

    cacheValue = this.aggregateCountValue(key);
    if (cacheValue > 0) { return cacheValue; }

    return 0;
  }

  /** Count aggregation value. */
  // eslint-disable-next-line max-lines-per-function
  private aggregateCountValue(key: string): number {
    switch (key) {
      case this.entities['Curriculum Vitae']?.key:
        return this.getCountValue(this.entities['Personal Data'].key)
          + this.getCountValue(this.entities.Background.key)
          + this.getCountValue(this.entities.Accomplishments.key);

      case this.entities.Background?.key:
        return this.getCountValue(this.entities['Professional Experience'].key)
          + this.getCountValue(this.entities.Education.key);

      case this.entities.Accomplishments?.key:
        return this.getCountValue(this.entities.Languages.key)
          + this.getCountValue(this.entities.Certifications.key)
          + this.getCountValue(this.entities.Courses.key)
          + this.getCountValue(this.entities.Organizations.key)
          + this.getCountValue(this.entities['Honors and Awards'].key)
          + this.getCountValue(this.entities.Volunteering.key)
          + this.getCountValue(this.entities['Interests and Hobbies'].key)
          + this.getCountValue(this.entities.Vacation.key)
          + this.getCountValue(this.entities.Publications.key);

      default:
        ['Index', 'List', 'Chart', 'Map'].forEach((_) => { key = key.replace(new RegExp(' ' + _, 'g'), ''); });
        return this.getFixedOrCacheCountValue(key);
    }
  }

  /** Fixed collection length or count cache value. */
  private getFixedOrCacheCountValue(key: string): number {
    switch (key) {
      case this.entities['Personal Data']?.key:
        return this.portfolioService.model.portfolioModel.cv['Personal data']?.length;

      case this.entities.Education?.key:
        // return this.portfolioService.model.portfolioModel.filtered.Education.length;
        return this.portfolioService.model.portfolioModel.cv.Education?.length;

      case this.entities['Professional Experience']?.key:
        // return this.portfolioService.model.portfolioModel.filtered['Professional Experience'].length;
        return this.portfolioService.model.portfolioModel.cv['Professional experience']?.length;

      default:
        return this.getCountValueProjects(key);
    }
  }

  /** Fixed collection length or count cache value for project sections. */
  private getCountValueProjects(key: string): number {
    switch (key) {
      case this.entities.Projects?.key:
      case this.entities['Project Portfolio']?.key:
        return this.portfolioService.model.portfolioModel.filtered.Projects.length;

      default:
        return this.getCountValueProjectSubsections(key);
    }
  }

  /** Fixed collection length or count cache value for project portfolio sections. */
  private getCountValueProjectSubsections(key: string): number {
    switch (key) {
      case 'Gantt':
      case this.entities.Contributions?.key:
      case this.entities.List?.key:
      case this.entities.Index?.key:
        return this.portfolioService.model.portfolioModel.filtered.Projects.length;

      default:
        return this.getCountValueFooter(key);
    }
  }

  /** Fixed collection length or count cache value for footer sections. */
  private getCountValueFooter(key: string): number {
    switch (key) {
      case this.entities['General Timeline']?.key:
        // case this.entities['General Timeline Map']?.key:
        return this.portfolioService.model.portfolioModel.filtered.TimelineEvents.length;

      case this.entities.Navigation?.key:
        return Object.values(this.entities).filter((_) => _.class !== '').length;

      default:
        break;
    }

    return this.entitiesModel.countCache[this.entities[key]?.cacheKey ?? key];
  }

  /**
   * Calculates the number of items in an aggregation string based on a splitter character/string.
   *
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   * @param splitter The splitter character/string.
   *
   * @returns The number of items in an aggregation string.
   */
  public count(collection: Indexable[], propertyName: string, splitter: string = ', '): number {
    const aggregate = this.aggregate(collection, propertyName, splitter);
    const matches = aggregate.match(new RegExp(this.uiService.frequenciesDivider, 'g'));
    return matches ? matches.length + 1 : aggregate.length > 0 ? 1 : 0;
  }

  /**
   * Aggregates the value parts in a collection objects' property based on a splitter character/string.
   *
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   * @param splitter The splitter character/string.
   *
   * @description
   * For a given object property name in the collection of objects, extracts the values, concatenates them with the splitter
   * and filters out the blank ones and the repetitions.
   *
   * @returns A string with the aggregated values.
   */
  private aggregate(collection: Indexable[], propertyName: string, splitter: string = ', '): string {
    if ((typeof collection === 'undefined')) {
      return '';
    }

    let aggregation = '';

    for (const property of collection) {
      let propertyValue = property[propertyName];

      propertyValue = this.excelDateFormatterService.formatDates(['From', 'To'], propertyName, propertyValue);

      aggregation = aggregation.concat(propertyValue, splitter);
    }

    const arr = aggregation.split(splitter);

    aggregation = arr
      .filter((item: string, pos: number) => item !== '' && arr.indexOf(item) === pos)
      .join(' ' + this.uiService.frequenciesDivider + ' ');

    return aggregation;
  }
}
