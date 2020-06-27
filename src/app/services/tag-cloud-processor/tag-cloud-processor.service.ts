import { Injectable } from '@angular/core';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { StringExService } from '../string-ex/string-ex.service';

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

  /** The base percentage for the tag lightness. 0 - for darkest, 100 - for lightest. */
  private readonly lightnessBase = parseFloat(document.documentElement.style.getPropertyValue('--tag-cloud-lightness-base-color-l'));

  /** The top percentage for the tag lightness. 0 - for darkest, 100 - for lightest. */
  private readonly lightnessTop = parseFloat(document.documentElement.style.getPropertyValue('--black-color-l'));

  /** The key. */
  private get courseIndexKey() { return 'Name'; }

  /**
   * Calculates the frequency of occurrence of any value parts in a collection objects' property based on a splitter character/string.
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   * @param splitter The splitter character/string. Optional.
   * @param ai Whether to apply lexical analysis euristics when parsing each value encountered. Optional.
   *
   * @description
   * For a given object property name in the collection of objects, extracts the values, concatenates them and then calculates the frequency of occurrence of any value parts based on the splitter character/string.
   *
   * @returns An array of key/value pairs of value part and an object containing its statistics including count, percentage and lightness value when rendered.
   */
  calcFrequencies(collection: any, propertyName: string, splitter: string = ', ', ai: boolean = false): [string, {}][] {
    if ((typeof collection === 'undefined')) {
      return [];
    }

    let frequencies = '';

    for (const property of collection) {
      let propertyValue = property[propertyName];

      propertyValue = this.excelDateFormatterService.formatDates(['From', 'To'], propertyName, propertyValue);

      // apply lexical analysis euristics when parsing each value encountered
      if (ai) {
        // conjunctions
        [' and ', '; ', 'of the ', 'mainly'].forEach(_ =>
          propertyValue = this.replaceAll(propertyValue, _, splitter));

        // skip trash words
        [' incl.', ' parts', 'on-going ', '-related'].forEach(_ =>
          propertyValue = this.replaceAll(propertyValue, _, ''));

        // skip circumstances endings
        [' at '].forEach(_ => {
          const occurrence = propertyValue.indexOf(_);
          if (occurrence > -1) {
            propertyValue = propertyValue.substr(0, occurrence);
          }
        });
      }

      frequencies = frequencies.concat(propertyValue, splitter);
    }

    let data = frequencies.split(splitter);
    data = data.filter(_ => _ !== '');

    // apply lexical analysis euristics when parsing each value encountered
    if (ai) {
      data = data.map(_ => this.capitalize(_.trim()));
    }

    const wordCount: any = {};
    let length;
    let min = 0;
    let max = 0;

    if (propertyName === this.courseIndexKey) {
      const propertyNameKey = this.courseIndexKey;
      const propertyNameValue = 'Strength';

      length = collection.length;
      for (let i = 0; i < length; i++) {
        const value = collection[i][propertyNameValue];
        if (value < min) { min = value; }
        if (value > max) { max = value; }
        const newValue = value;
        wordCount[collection[i][propertyNameKey]] = newValue;
      }
    } else {
      length = data.length;
      for (let i = 0; i < length; i++) {
        const value = wordCount[data[i]];
        if (value < min) { min = value; }
        if (value > max) { max = value; }
        const newValue = (typeof value === 'undefined') ? 1 : value + 1;
        wordCount[data[i]] = newValue;
      }
    }

    return this.normalizeFrequencies(wordCount, length, min, max, propertyName);
  }

  /**
   * Normalizes frequencies and adds display properties.
   * @param wordCount The raw frequencies data array.
   * @param length The length of the array processed.
   * @param min The minimum value.
   * @param max The maximum value.
   * @param propertyName The key of the object processed.
   *
   * @returns An array of key/value pairs of value part and an object containing its statistics including count, percentage and lightness value when rendered.
   */
  normalizeFrequencies(wordCount: any, length: number, min: number, max: number, propertyName: string): [string, {}][] {
    if (min === max) {
      min -= 100;
    }

    for (const i in wordCount) {
      if (wordCount.hasOwnProperty(i)) {
        wordCount[i] = {
          'Count': wordCount[i],
          'Percentage': Math.round(wordCount[i] / length * 100),
          'Lightness': Math.round(((max - wordCount[i] + 1) * this.lightnessBase + (wordCount[i] - 1 - min) * this.lightnessTop ) / (max - min)),
          get Label() {
            return StringExService.splitLine(
              i + ': ' +
              this.Count +
              (propertyName === this.courseIndexKey ? '%' : ' (' + this.Percentage + '%)')
            ).join('\n');
          }
        };
      }
    }

    return Object.entries(wordCount);
  }

  /** Replace all delegate. */
  public replaceAll(str, search, replacement) { return StringExService.replaceAll(str, search, replacement); }
  /** Capitalize delegate. */
  private capitalize(str) { return StringExService.capitalize(str); }
}
