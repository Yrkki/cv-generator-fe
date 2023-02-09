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
/* eslint-disable max-lines */
import { Injectable } from '@angular/core';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { StringExService } from '../string-ex/string-ex.service';

/**
 * Tag cloud processor service
 */
@Injectable({
  providedIn: 'root'
})
export class TagCloudProcessorService {
  /** Max AI item length */
  private readonly maxAiItemLength = 40;

  /**
   * Construct the tag cloud processor service
   *
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
   * Preprocesses and then calculates the frequency of occurrence of any value parts in a collection objects' property
   * based on a splitter character/string.
   *
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   * @param splitter The splitter character/string. Optional.
   * @param ai Whether to apply lexical analysis euristics when parsing each value encountered. Optional.
   *
   * @description
   * For a given object property name in the collection of objects, extracts the values, concatenates them and then calculates
   * the frequency of occurrence of any value parts based on the splitter character/string.
   *
   * @returns An array of key/value pairs of value part and an object containing its statistics including count, percentage
   * and lightness value when rendered.
   */
  public calcFrequencies(
    collection: any, propertyName: string, splitter: string = ', ', ai: boolean = false): [string, Record<string, unknown>][] {
    if ((typeof collection === 'undefined')) { return []; }

    let frequencies = '';
    for (const property of collection) {
      let propertyValue = property[propertyName];
      propertyValue = this.excelDateFormatterService.formatDates(['From', 'To'], propertyName, propertyValue);

      // apply lexical analysis euristics when parsing each value encountered
      if (ai) { propertyValue = this.applyLexicalAnalysisEuristics(propertyValue, splitter); }

      frequencies = frequencies.concat(propertyValue, splitter);
    }

    let data = frequencies.split(splitter);
    data = data.filter((_) => _ !== '');

    if (ai) {
      data = data.filter((_) => _.length <= this.maxAiItemLength); // skip long items
      data = data.map((_) => this.capitalize(_.trim()));
    }

    return this.calcPreprocessedFrequencies(data, collection, propertyName);
  }

  /**
   * Apply lexical analysis euristics to a token.
   *
   * @param token The token to process.
   * @param splitter The splitter character/string. Optional.
   *
   * @returns Modified token
   */
  private applyLexicalAnalysisEuristics(token: string, splitter: string = ', '): string {
    // conjunctions
    [' and ', '; ', 'of the ', 'mainly'].forEach((_) =>
      token = this.replaceAll(token, _, splitter));

    // skip trash words
    [' incl.', ' parts', 'on-going ', '-related'].forEach((_) =>
      token = this.replaceAll(token, _, ''));

    // skip circumstances endings
    [' at '].forEach((_) => {
      const occurrence = token.indexOf(_);
      if (occurrence > -1) {
        token = token.substring(0, occurrence);
      }
    });

    return token;
  }

  /**
   * Calculates the frequency of occurrence of any value parts in a collection objects' property based on a splitter character/string.
   *
   * @param data The preprocessed collection data to process.
   * @param collection The collection of objects to process.
   * @param propertyName The name of the property to process.
   *
   * @description
   * For a given object property name in the collection of objects, extracts the values, concatenates them and then calculates
   * the frequency of occurrence of any value parts based on the splitter character/string.
   *
   * @returns An array of key/value pairs of value part and an object containing its statistics including count, percentage
   * and lightness value when rendered.
   */
  private calcPreprocessedFrequencies(data: string[], collection: any, propertyName: string): [string, Record<string, unknown>][] {
    const wordCount: any = {};
    const length = 0;
    const min = 0;
    const max = 0;
    const ctx = { wordCount, length, min, max };

    if (propertyName === this.courseIndexKey) {
      this.processCollection(collection, ctx);
    } else {
      this.processData(data, ctx);
    }

    return this.normalizeFrequencies(ctx.wordCount, ctx.length, ctx.min, ctx.max, propertyName);
  }

  /**
   * Processes the initial collection.
   *
   * @param collection The collection of objects to process.
   * @param ctx The context of optimisation parameters.
   *
   * @returns The modified context.
   */
  private processCollection(collection: any, ctx: any): any {
    const propertyNameKey = this.courseIndexKey;
    const propertyNameValue = 'Strength';

    for (const iterator of collection) {
      const value = iterator[propertyNameValue];
      ctx.length += value;

      const newValue = value;

      if (newValue < ctx.min) { ctx.min = newValue; }
      if (newValue > ctx.max) { ctx.max = newValue; }

      ctx.wordCount[iterator[propertyNameKey]] = newValue;
    }

    return ctx;
  }

  /**
   * Processes the preprocessed collection.
   *
   * @param data The preprocessed collection data to process.
   * @param ctx The context of optimisation parameters.
   *
   * @returns The modified context.
   */
  private processData(data: string[], ctx: any): any {
    for (const iterator of data) {
      const value = ctx.wordCount[iterator];
      const newValue = this.incValue(value);

      if (newValue < ctx.min) { ctx.min = newValue; }
      if (newValue > ctx.max) { ctx.max = newValue; }

      ctx.wordCount[iterator] = newValue;
    }
    ctx.length = data.length;

    return ctx;
  }

  /**
   * Increment a possibly undefined value.
   *
   * @param value The value to increment.
   *
   * @returns The incremented value.
   */
  private incValue(value: number): number {
    const newValue = (typeof value === 'undefined') ? 1 : value + 1;
    return newValue;
  }

  /**
   * Normalizes frequencies and adds display properties.
   *
   * @param wordCount The raw frequencies data array.
   * @param length The length of the array processed.
   * @param min The minimum value.
   * @param max The maximum value.
   * @param propertyName The key of the object processed.
   *
   * @returns An array of key/value pairs of value part and an object containing its statistics including count,
   * percentage and lightness value when rendered.
   */
  private normalizeFrequencies(
    wordCount: any,
    length: number,
    min: number,
    max: number,
    propertyName: string
  ): [string, Record<string, unknown>][] {
    if (min === max) {
      min -= 100;
    }

    for (const i in wordCount) {
      if (Object.prototype.hasOwnProperty.call(wordCount, i)) {
        wordCount[i] = this.newWordCount(wordCount, length, min, max, i);
      }
    }

    return Object.entries(wordCount);
  }

  /**
   * Calculates a new word count object.
   *
   * @param wordCount The raw frequencies data array.
   * @param length The length of the array processed.
   * @param min The minimum value.
   * @param max The maximum value.
   * @param i The current word count key.
   *
   * @returns A formatted label.
   */
  private newWordCount(wordCount: any, length: number, min: number, max: number, i: string): any {
    const wordCountI = wordCount[i];
    const getLabel = this.getLabel;
    const getShortLabel = this.getShortLabel;
    const addSignificance = this.addSignificance;
    const addMaximality = this.addMaximality;

    const cache = ((max - wordCountI) * this.lightnessTop + (wordCountI - min) * this.lightnessBase) / (max - min);
    return {
      Count: wordCount[i],
      Significance: Math.round(wordCountI / length * 1000) / 10,
      Maximality: Math.round((wordCountI - min) / (max - min) * 100),
      Lightness: Math.round(
        ((max - wordCountI) * this.lightnessBase + (wordCountI - min) * this.lightnessTop) / (max - min)),
      Size: Math.round(16 + 0.075 * 100 / 100 * cache),
      Weight: Math.round(400 + 0.50 * 500 / 100 * cache),
      get Label() {
        let label = getLabel(i, this.Count);
        label = addSignificance(label, this.Significance, length);
        label = addMaximality(label, this.Maximality, min, max);
        return label;
      },
      get ShortLabel() { return getShortLabel(i, this.Count, this.Significance); }
    };
  }

  /**
   * Label callback.
   *
   * @param i The current word count key.
   * @param count The current word count value.
   *
   * @returns A formatted label.
   */
  public getLabel(i: string, count: string): string {
    let label = i + ': ' + count;
    label = StringExService.splitLine(label).join('\n');
    return label;
  }

  /**
   * Short label callback (for display in charts).
   *
   * @param i The current word count key.
   * @param count The current word count value.
   * @param significance The significance percentage value.
   *
   * @returns A formatted short label.
   */
  public getShortLabel(i: string, count: string, significance: number): string {
    let label = i + ': ' + count;
    label = StringExService.splitLine(label).join('\n');
    if (significance >= 0) { label += ` (${significance}%)`; }
    return label;
  }

  /**
   * Add significance percentage to the label.
   *
   * @param label The label to process.
   * @param significance The significance percentage value.
   * @param length The length of the array processed.
   *
   * @returns A formatted label.
   */
  public addSignificance(label: string, significance: number, length: number): string {
    let extras: string[];
    extras = [];
    if (significance >= 0) { extras = extras.concat([`    Significance: ${significance}%`]); }
    if (length >= 0) { extras = extras.concat([`    Total: ${length}`]); }
    if (extras.length > 0) { label += (['\n'].concat(extras)).join('\n'); }

    return label;
  }

  /**
   * Add maximality percentage to the label.
   *
   * @param label The label to process.
   * @param maximality The maximality percentage value.
   * @param min The minimum value.
   * @param max The maximum value.
   *
   * @returns A formatted label.
   */
  public addMaximality(label: string, maximality: number, min: number, max: number): string {
    let extras: string[];
    extras = [];
    if (maximality >= 0) { extras = extras.concat([`    Maximality: ${maximality}%`]); }
    if (min >= 0) { extras = extras.concat([`    Min: ${min}`]); }
    if (max >= 0) { extras = extras.concat([`    Max: ${max}`]); }
    if (extras.length > 0) { label += (['\n'].concat(extras)).join('\n'); }

    return label;
  }

  /** Replace all delegate. */
  public replaceAll(str: string, search: string | RegExp, replacement: any): string {
    return StringExService.replaceAll(str, search, replacement);
  }
  /** Capitalize delegate. */
  private capitalize(str: string): string { return StringExService.capitalize(str); }
}
