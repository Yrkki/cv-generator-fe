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
  public get entities() { return this.portfolioService.entities; }

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

  /** Count cache, aggregation or fixed collection length value. */
  public getCountValue(key: string): number {
    const cache = this.entitiesModel.countCache;

    let cacheValue = cache[key];
    if (cacheValue > 0) { return cacheValue; }

    cacheValue = this.aggregateCountValue(key);
    if (cacheValue > 0) { return cacheValue; }

    cacheValue = cache[key];
    if (cacheValue > 0) { return cacheValue; }

    return 0;
  }

  /** Count aggregation value. */
  private aggregateCountValue(key: string): number {
    // if (!this.entities || this.entities === undefined || this.entities.) { return 0; }

    switch (key) {
      case this.entities['Curriculum Vitae']?.key:
        return this.getCountValue(this.entities['Personal Data']?.key)
          + this.getCountValue(this.entities.Background?.key)
          + this.getCountValue(this.entities.Accomplishments?.key);

      case this.entities.Background?.key:
        return this.getCountValue(this.entities['Professional Experience']?.key)
          + this.getCountValue(this.entities.Education?.key);

      // case this.entities['Accomplishments']?.key:
      //   return this.portfolioService.filtered.Accomplishments.length;
      //   break;
      case this.entities.Accomplishments?.key:
        return this.getCountValue(this.entities.Languages?.key)
          + this.getCountValue(this.entities.Certifications?.key)
          + this.getCountValue(this.entities.Courses?.key)
          + this.getCountValue(this.entities.Organizations?.key)
          + this.getCountValue(this.entities.Vacation?.key)
          + this.getCountValue(this.entities.Vacation?.key)
          + this.getCountValue(this.entities.Publications?.key);

      default:
        return this.getFixedOrCacheCountValue(key
          .replace(/ Index/g, '')
          .replace(/ List/g, '')
          .replace(/ Chart/g, '')
          .replace(/ Map/g, '')
        );
    }
  }

  /** Fixed collection length or count cache value. */
  private getFixedOrCacheCountValue(key: string): number {
    switch (key) {
      case this.entities['Personal Data']?.key:
        return this.portfolioService.cv['Personal data']?.length;

      case this.entities.Education?.key:
        // return this.portfolioService.filtered.Education.length;
        return this.portfolioService.cv.Education?.length;

      case this.entities['Professional Experience']?.key:
        // return this.portfolioService.filtered['Professional Experience'].length;
        return this.portfolioService.cv['Professional experience']?.length;

      // case this.entities['Gantt Chart Map']?.key:
      // case this.entities['Gantt Chart']?.key:
      case this.entities.Projects?.key:
      case 'Gantt':
      case this.entities.Contributions?.key:
      case this.entities.List?.key:
      case this.entities.Index?.key:
      case this.entities['Project Portfolio']?.key:
        // cacheKey = 'Projects';
        // return cache[cacheKey];
        return this.portfolioService.filtered.Projects.length;

      case this.entities['General Timeline']?.key:
        // case this.entities['General Timeline Map']?.key:
        return this.generalTimelineService.FilteredTimelineEvents.length;

      case this.entities.Navigation?.key:
        return Object.values(this.entities).filter(_ => _.class !== '').length;

      default:
        break;
    }

    return this.getCacheCountValue(key);
  }

  /** Count cache value. */
  private getCacheCountValue(key: string): number {
    const cache = this.entitiesModel.countCache;

    let cacheKey = key;
    switch (key) {
      case this.entities.Certifications?.key: cacheKey = 'Certification'; break;
      case this.entities.Languages?.key: cacheKey = 'Language'; break;
      case this.entities.Courses?.key: cacheKey = 'Name'; break;
      case this.entities.Organizations?.key: cacheKey = 'Organization'; break;
      case this.entities.Volunteering?.key: cacheKey = 'Volunteering'; break;
      case this.entities.Vacation?.key: cacheKey = 'Vacation'; break;
      case this.entities.Publications?.key: cacheKey = 'Title'; break;
      case this.entities.Badges?.key: cacheKey = 'Badges'; break;
      default: break;
    }

    return cache[cacheKey];
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
