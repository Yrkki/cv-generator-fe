// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
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
