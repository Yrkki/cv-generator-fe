// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Keys pipe.
 * ~implements {@link PipeTransform}
 */
@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  /**
   * Gets the array of keys out of an object.
   * ~override
   *
   * @param value The object to process.
   *
   * @returns The keys array.
   */
  transform(value: Record<string, unknown>): any {
    return Object.keys(value);
  }
}
