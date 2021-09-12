// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        SearchService,
      ]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should process a search query', () => {
    service.SearchToken = 'qwerty "asdf fdsa" or \'zxcvb\'';
    const count = service.model.portfolioModel.filtered.Projects.length;

    expect(count).toBeDefined();
  });

  it('should check public interface properties', () => {
    expect(() => {
      service.SearchToken = service.SearchToken;

      let readAll;
      readAll = service.filterService;
      readAll = service.model;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      const readAll = service.updateSearchToken(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check public interface events', () => {
    expect(() => {
      service.searchTokenChanged$.emit('kon');
    }).not.toThrowError();
  });
});
