import { Injectable } from '@angular/core';

/**
 * A search tokenizer service
 */
@Injectable({
  providedIn: 'root'
})
export class SearchTokenizerService {
  /** The OR logical disjunction operator */
  private readonly orOperator = ' or ';

  /** Double quote presence detection regular expression */
  private readonly reQuote = /(?:[^\s"]+|"[^"]*")+/gi;
  /** Single quote (apostrophe) presence detection regular expression */
  private readonly reApostrophe = /(?:[^\s']+|'[^']*')+/gi;
  /** The acceptable quote characters */
  private readonly quoteSymbols = '"\'';

  /**
   * Tokenizes a string query expression into a structure of tokens, also watching for possible quoted tokens.
   * @param str String query expression to tokenize.
   *
   * @returns The tokenized search expression in disjunctive normal form, as a sum of products.
   */
  tokenize(str: string): string[][] {
    return str.split(this.orOperator)
      .filter(_ => _.trim().length > 0)
      .map(_ => (_.trim().match(_.includes('\'') ? this.reApostrophe : this.reQuote) || [])
        .filter(__ => __.trim().length > 0)
        .map(___ => this.stripQuote(___)));
  }

  /**
   * Trims leading and trailing character pairs from a string.
   * @param str The string to process.
   * @param char The character to trim.
   *
   * @returns The string with its leading and trailing character pairs deleted.
   */
  private trim(str: string, char: string): string {
    if (char === ']') { char = '\\]'; }
    if (char === '\\') { char = '\\\\'; }
    return str.replace(new RegExp(
      '^[' + char + ']+|[' + char + ']+$', 'g'
    ), '');
  }

  /**
   * Strips (trims) leading and trailing quote character pairs from a string.
   * @param str String to process.
   *
   * @returns The string with its leading and trailing quote character pairs deleted.
   */
  private stripQuote(str: string): string {
    if (!(str.length > 0)) {
      return '';
    }

    const quote = str[0];
    return this.quoteSymbols.includes(quote) ? this.trim(str, quote) : str;
  }
}
