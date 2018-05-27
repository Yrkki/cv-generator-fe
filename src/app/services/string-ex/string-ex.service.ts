import { Injectable } from '@angular/core';

/**
 * String processing utility functions service
 * */
@Injectable()
export class StringExService {

  /**
   * Replace all occurrences of a string within another string with a third string.
   * @param str String to replace occcurrences in.
   * @param search String to find.
   * @param replacement String to replace the found search string occurrences with.
   *
   * @returns String having all occurrences of the search string replaced with a replacement string.
   */
  static replaceAll(str, search, replacement): string {
    return str.replace(new RegExp(search, 'g'), replacement);
  }

  /**
   * Convert a string to title case.
   * @param str String to turn into title case.
   *
   * @returns The string converted into title case.
   */
  static toTitleCase(str: string): string {
    let i, j, lowers, uppers;
    str = str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
      'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++) {
      str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
        function (txt) {
          return txt.toLowerCase();
        });
    }

    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++) {
      str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
        uppers[i].toUpperCase());
    }

    return str;
  }
}
