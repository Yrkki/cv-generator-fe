import { Injectable } from '@angular/core';

/**
 * String processing utility functions service
 */
@Injectable({
  providedIn: 'root'
})
export class StringExService {

  /**
   * Replace all occurrences of a string within another string with a third string.
   * @param str String to replace occcurrences in.
   * @param search String to find.
   * @param replacement String to replace the found search string occurrences with.
   *
   * @returns String having all occurrences of the search string replaced with a replacement string.
   */
  static replaceAll(str: string, search: string | RegExp, replacement: any): string {
    return str.replace(new RegExp(search, 'g'), replacement);
  }

  /**
   * Capitalize a string to title case.
   * @param str String to capitalize.
   *
   * @returns The string capitalized.
   */
  static capitalize(str: string): string {
    return str && str.length > 0 ? str[0].toUpperCase() + str.substr(1) : str;
  }

  /**
   * Convert a string to title case.
   * @param str String to turn into title case.
   *
   * @returns The string converted into title case.
   */
  static toTitleCase(str: string | undefined): string {
    if (!str) { return ''; }

    let i: number;
    let j: number;
    let lowers: string | any[];
    let uppers: string | any[];
    str = str.replace(/([^\W_]+[^\s-]*) */g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
      'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++) {
      str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
        (txt) => txt.toLowerCase());
    }

    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Cv', 'Icb', 'Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++) {
      str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
        uppers[i].toUpperCase());
    }

    return str;
  }

  /**
   * Convert a string to Pascal case.
   * @param str String to turn into Pascal case.
   *
   * @returns The string converted into Pascal case.
   */
  static toPascalCase(str: string | undefined): string {
    return this.toTitleCase(str).split(' ').join('');
  }

  /**
   * Replaces separators with underscores.
   * @param value The string to process.
   *
   * @returns The processed string.
   */
  static snakeCase(value: string): string {
    return this.replaceAll(value, ' ', '_');
  }

  /**
   * Acronym.
   * @param value The string to shorten.
   *
   * @returns The acronym.
   */
  static acronym(value: string): string {
    return value.split(' ').map((_) => _[0]).join('').toUpperCase();
  }

  /**
   * Shortens a long caption.
   * @param str The caption to shorten.
   *
   * @returns A shortened caption.
   */
  static shorten(str: string): string {
    const maxlength = 50;

    if (str.length > maxlength) {
      str = str.substring(0, maxlength) + '...';
    }

    return str;
  }

  /**
   * Splits a long label into lines.
   * @param label The label(s) to split.
   *
   * @returns A lines array.
   */
  static splitLine(label: string | string[]): string[] {
    const str = label instanceof Array ? label.join(' - ') : label;
    const maxLength = 40;

    const lines: string[] = [];

    if (str.length > maxLength) {
      const firstSpace = str.substr(maxLength).indexOf(' ');
      if (firstSpace === -1) {
        lines.push(str);
        return lines;
      }

      StringExService.recurseSplitLine(str, maxLength, lines, firstSpace);

    } else {
      lines.push(str);
    }

    return lines;
  }

  /**
   * Recurses the splits lines function.
   * @param str The current string.
   * @param maxLength The line splittong line length threshold.
   * @param lines The array of lines being built.
   * @param firstSpace the first space ahead position.
   */
  private static recurseSplitLine(str: string, maxLength: number, lines: string[], firstSpace: number): void {
    const position = maxLength + firstSpace;
    lines.push(str.substr(0, position));
    this.splitLine(str.substr(position + 1)).forEach(_ => lines.push(_));
  }
}
