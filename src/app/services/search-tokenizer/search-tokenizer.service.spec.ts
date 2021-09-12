// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';

import { SearchTokenizerService } from './search-tokenizer.service';

// eslint-disable-next-line max-lines-per-function
describe('SearchTokenizerService', () => {
  let service: SearchTokenizerService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchTokenizerService]
    });
    service = TestBed.inject(SearchTokenizerService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = debugService.tokenize('');
      readAll = debugService.tokenize('test string');
      readAll = debugService.tokenize('"test string"');
      readAll = debugService.tokenize('\'test string\'');
      readAll = debugService.tokenize('"test   string"');
      debugService.reQuote = null;
      readAll = debugService.tokenize('"test   string"');

      readAll = debugService.trim('', '');
      readAll = debugService.trim('', ']');
      readAll = debugService.trim('', '\\');

      readAll = debugService.stripQuote('');
      readAll = debugService.stripQuote('test');
    }).not.toThrowError();
  });
});
