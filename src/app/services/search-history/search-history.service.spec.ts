// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
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
import { TestBed } from '@angular/core/testing';

import { SearchHistoryService } from './search-history.service';

// eslint-disable-next-line max-lines-per-function
describe('SearchHistoryService', () => {
  let service: SearchHistoryService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchHistoryService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should process keydown', () => {
    expect(() => {
      [true, false].forEach((shiftKey) => {
        [true, false].forEach((ctrlKey) => {
          [[''], ['something'], ['kon'], ['something', 'kon']].forEach((hintSearch) => {
            service.hintSearch = hintSearch;
            ['Enter', 'ArrowDown', 'ArrowUp'].forEach((key) => {
              service.keydown(new KeyboardEvent('keydown', { key, shiftKey, ctrlKey }));
            });
          });
        });
      });
    }).not.toThrowError();
  });

  it('should process keydown Enter', () => {
    expect(() => {
      [true, false].forEach((shiftKey) => {
        [true, false].forEach((ctrlKey) => {
          [[''], ['something'], ['kon'], ['something', 'kon']].forEach((hintSearch) => {
            service.hintSearch = hintSearch;
            debugService.processKeydownEnter(new KeyboardEvent('keydown', { key: 'Enter', shiftKey, ctrlKey }));
          });
        });
      });
    }).not.toThrowError();
  });

  it('should process keydown ArrowDown', () => {
    expect(() => {
      [true, false].forEach((shiftKey) => {
        [true, false].forEach((ctrlKey) => {
          [[''], ['something'], ['kon'], ['something', 'kon']].forEach((hintSearch) => {
            service.hintSearch = hintSearch;
            debugService.processKeydownArrowDown(new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey, ctrlKey }));
          });
        });
      });
    }).not.toThrowError();
  });

  it('should process keydown ArrowUp', () => {
    expect(() => {
      [true, false].forEach((shiftKey) => {
        [true, false].forEach((ctrlKey) => {
          [[''], ['something'], ['kon'], ['something', 'kon']].forEach((hintSearch) => {
            service.hintSearch = hintSearch;
            debugService.processKeydownArrowUp(new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey, ctrlKey }));
          });
        });
      });
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.hintSearch;
      readAll = service.hintSearchHead;
      readAll = service.hintSearchString;
      readAll = service.newSearchTokenSuggestion;
      readAll = service.searchHistoryEmptyPlaceholder;
      readAll = service.searchHistoryMaxLength;

      service.searchHistory = service.searchHistory;
      debugService.persistenceService.removeItem('Search history');
      service.searchHistory = service.searchHistory;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;

      [[], ['something'], ['kon'], ['something', 'kon'], ['kon', 'kon1']].forEach((_) => {
        service.searchHistory = _;
        readAll = service.updateHintSearch('kon');
      });

      [[], ['something'], [
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
        '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']].forEach((_) => {
          service.searchHistory = _;
          ['', 'something'].forEach((query) => {
            readAll = service.saveSearchToHistory(query);
          });
        });
    }).not.toThrowError();
  });
});
