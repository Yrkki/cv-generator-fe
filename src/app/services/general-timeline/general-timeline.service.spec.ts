// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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
/* eslint-disable max-len */
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockDataService } from '../mock-data/mock-data.service';

import { GeneralTimelineService } from './general-timeline.service';

// eslint-disable-next-line max-lines-per-function
describe('GeneralTimelineService', () => {
  let service: GeneralTimelineService;
  let debugService: any;
  let mockDataService: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        GeneralTimelineService,
      ]
    });
    service = TestBed.inject(GeneralTimelineService);
    debugService = service as any;
    mockDataService = TestBed.inject(MockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = service.optionsScalesXAxes0Ticks;

      // tslint:disable-next-line: no-invalid-this
      readAll = service.addChart.apply(service, [mockDataService.mockData.projects, mockDataService.mockData.filteredProjects]);
      readAll = service.data;
    }).not.toThrowError();
  });
});
