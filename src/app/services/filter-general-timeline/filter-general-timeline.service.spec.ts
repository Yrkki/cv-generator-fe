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
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { FilterGeneralTimelineService } from './filter-general-timeline.service';
import { MockDataService } from '../mock-data/mock-data.service';

// eslint-disable-next-line max-lines-per-function
describe('FilterGeneralTimelineService', () => {
  let service: FilterGeneralTimelineService;
  let dataService: MockDataService;
  let debugService: any;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        FilterGeneralTimelineService,
      ]
    });
    service = TestBed.inject(FilterGeneralTimelineService);
    dataService = TestBed.inject(MockDataService);
    debugService = service as any;

    await dataService.getGeneralTimeline().pipe(take(1)).subscribe((gt: any) => {
      debugService.portfolioModel.generalTimeline = gt;
    });
  }));

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
      readAll = service.calcFilteredTimelineEvents();

      readAll = debugService.calcFilteredTimelineEventsPart(debugService.generalTimeline, ['Lorem i']);
    }).not.toThrowError();
  });
});
