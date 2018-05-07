import { Injectable } from '@angular/core';

@Injectable()
export class SearchTokenizerService {
  private readonly reQuote = /(?:[^\s"]+|"[^"]*")+/gi;
  private readonly reApostrophe = /(?:[^\s']+|'[^']*')+/gi;
  private readonly quoteSymbols = '"\'';
  private readonly orOperator = ' or ';

  constructor() { }

  tokenize(str: string): string[][] {
    return str.split(this.orOperator)
      .filter(_ => _.trim().length > 0)
      .map(_ => _.trim().match(_.includes('\'') ? this.reApostrophe : this.reQuote)
        .filter(__ => __.trim().length > 0)
        .map(___ => this.stripQuote(___)));
  }

  private trim(s, c): string {
    if (c === ']') { c = '\\]'; }
    if (c === '\\') { c = '\\\\'; }
    return s.replace(new RegExp(
      '^[' + c + ']+|[' + c + ']+$', 'g'
    ), '');
  }

  private stripQuote(s) {
    if (!(s.length > 0)) {
      return '';
    }

    const quote = s[0];
    return this.quoteSymbols.includes(quote) ? this.trim(s, quote) : s;
  }
}
