// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';

import { EngineService } from './engine.service';
import { HttpClientModule } from '@angular/common/http';

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
});
