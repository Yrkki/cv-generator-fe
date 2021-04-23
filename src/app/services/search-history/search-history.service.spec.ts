import { TestBed } from '@angular/core/testing';

import { SearchHistoryService } from './search-history.service';

// eslint-disable-next-line max-lines-per-function
describe('SearchHistoryService', () => {
  let service: SearchHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = service.hintSearch;
      readAll = service.hintSearchHead;
      readAll = service.hintSearchString;
      readAll = service.newSearchTokenSuggestion;
      readAll = service.searchHistoryEmptyPlaceholder;
      readAll = service.searchHistoryMaxLength;

      service.searchHistory = service.searchHistory;

      service.updateHintSearch('test');
      service.saveSearchToHistory('test');
      service.keydown(new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true }));
      service.keydown(new KeyboardEvent('keydown', { key: 'ArrowUp', ctrlKey: true }));
      service.keydown(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true }));
    }).not.toThrowError();
  });
});
