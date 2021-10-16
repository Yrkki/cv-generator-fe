// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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

/**
 * An MS Excel date parser/formatter service.
 */
@Injectable({
  providedIn: 'root'
})
export class ExcelDateFormatterService {
  /**
   * Constructs the MS Excel date parser/formatter.
   * ~constructor
   */
  constructor() { }

  /**
   * Formats an Excel date.
   *
   * @param excelDate An Excel-format date.
   *
   * @returns The formatted date.
   */
  formatDate(excelDate: number): string {
    const date = this.getJsDateValueFromExcel(excelDate);
    let formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    formattedDate = formattedDate.replace(',', '');
    return formattedDate;
  }

  /**
   * Gets a javaScript-format date value from an Excel-format date.
   *
   * @param excelDate The Excel-format date or string representation.
   *
   * @returns The javaScript-format date.
   */
  getJsDateValueFromExcel(excelDate: any): Date {
    let date = new Date(2000, 0, 1);

    if (typeof excelDate === 'string') {
      const timestamp = Date.parse(excelDate);
      date = new Date(timestamp);
    } else if (typeof excelDate === 'number') {
      date = new Date(this.getRawJsDateValueFromExcel(excelDate));
    }

    return date;
  }

  /**
   * Gets a raw javaScript-format date value from an Excel-format date.
   *
   * @param excelDate The Excel-format date.
   *
   * @returns The javaScript-compatible date number.
   */
  private getRawJsDateValueFromExcel(excelDate: number): number {
    return (excelDate - (25567 + 2)) * 86400 * 1000;
  }

  /**
   * Formats a date if found in a date property filter.
   *
   * @param dateFields An array of date property name fields filter.
   * @param propertyName The date field to check and process.
   * @param propertyValue The property value to format and return.
   *
   * @returns The eventually formated property value.
   */
  formatDates(dateFields: string[], propertyName: string, propertyValue: any): any {
    if (dateFields.indexOf(propertyName) > -1) {
      propertyValue = this.formatDate(propertyValue);
    }
    return propertyValue;
  }

  /** Calculate whether started date is in the future. */
  inTheFuture(date: number) {
    return date && Date.now() < this.getJsDateValueFromExcel(date).valueOf();
  }
}
