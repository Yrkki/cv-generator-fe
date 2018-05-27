import { Injectable } from '@angular/core';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

/**
 * Tag cloud processor service
 */
@Injectable()
export class TagCloudProcessorService {

  /**
   * Construct the tag cloud processor service
   * @param excelDateFormatterService An Excel date formatter dependency service.
   */
  constructor(private excelDateFormatterService: ExcelDateFormatterService) { }

  /**
   * Calculates the frequency of ocurrence of any value parts in a collection objects' property based on a splitter delimiter.
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   * @param splitter The splitter delimiter character/string.
   *
   * @description
   * For a given object property name in the collection of objects, extracts the values, concatenates them and then calculates the frequency of ocurrence of any value parts based on the splitter delimiter.
   *
   * @returns An array of key/value pairs of value part and an object containing its statistics including count, percentage and lightness value when rendered.
   */
  calcFrequencies(collection: any, propertyName: string, splitter: string = ', '): [string, {}][] {
    if ((typeof collection === 'undefined')) {
      return [];
    }

    let frequencies = '';

    for (let i = 0; i < collection.length; i++) {
      let propertyValue = collection[i][propertyName];

      propertyValue = this.excelDateFormatterService.formatDates(['From', 'To'], propertyName, propertyValue);

      frequencies = frequencies.concat(propertyValue, splitter);
    }

    let data = frequencies.split(splitter);
    data = data.filter(_ => _ !== '');

    const wordCount: any = {};
    const length = data.length;
    let min = 0;
    let max = 0;
    for (let i = 0; i < length; i++) {
      const value = wordCount[data[i]];
      if (value < min) { min = value; }
      if (value > max) { max = value; }
      const newValue = (typeof value === 'undefined') ? 1 : value + 1;
      wordCount[data[i]] = newValue;
    }
    for (const i in wordCount) {
      if (wordCount.hasOwnProperty(i)) {
        wordCount[i] = {
          'Count': wordCount[i],
          'Percentage': Math.round(wordCount[i] / length * 100),
          'Lightness': Math.round((max - wordCount[i] + 1) / (max - min) * 50)
        };
      }
    }

    return Object.entries(wordCount);
  }
}
