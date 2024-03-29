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

import { EngineService } from './engine.service';
import { HttpClientModule } from '@angular/common/http';

import { Go } from '../../enums/go.enum';

// eslint-disable-next-line max-lines-per-function
describe('SearchService', () => {
  let service: EngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(EngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.searchService;
      readAll = service.filterService;
      readAll = service.filterGeneralTimelineService;
      readAll = service.model;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;

      [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
        readAll = service.ReclassifyAccomplishments(new MouseEvent('click'), _);
      });
    }).not.toThrowError();
  });
});
