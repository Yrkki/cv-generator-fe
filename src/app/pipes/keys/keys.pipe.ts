import { Pipe, PipeTransform } from '@angular/core';

/** Type decorator */
@Pipe({
  name: 'keys'
})
/** Object keys convenience pipe */
export class KeysPipe implements PipeTransform {

  /**
   * Gets the array of keys out of an object.
   * @override
   *
   * @param value The object to process.
   * @param args Possible args override parameter. Unused.
   *
   * @returns The keys array.
   */
  transform(value, args: string[]): any {
    return Object.keys(value);
  }
}
