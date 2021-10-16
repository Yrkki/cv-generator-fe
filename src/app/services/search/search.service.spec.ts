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
