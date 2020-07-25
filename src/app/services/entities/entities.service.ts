import { Injectable } from '@angular/core';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { UiService } from '../../services/ui/ui.service';

import { DataService } from '../../services/data/data.service';
import { ChartService } from '../../services/chart/chart.service';
import { TagCloudProcessorService } from '../../services/tag-cloud-processor/tag-cloud-processor.service';
import { SearchEngineService } from '../../services/search-engine/search-engine.service';
import { ExcelDateFormatterService } from '../excel-date-formatter/excel-date-formatter.service';
import { PersistenceService } from '../persistence/persistence.service';

import { Indexable } from '../..//interfaces/indexable';

/**
 * A entities service.
 */
@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  /**
   * Constructs the entities service.
   * ~constructor
   *
   * @param portfolioModel The portfolio model injected dependency.
   * @param uiService The UI service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param tagCloudProcessorService The tag cloud processor service injected dependency.
   * @param searchEngineService The search engine service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    public uiService: UiService,
    private excelDateFormatterService: ExcelDateFormatterService
  ) {
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
