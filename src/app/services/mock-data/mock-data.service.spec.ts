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
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MockDataService } from './mock-data.service';
import { take } from 'rxjs/operators';

// eslint-disable-next-line max-lines-per-function
describe('MockDataService', () => {
  let service: MockDataService;
  let debugService: any;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockDataService,
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MockDataService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = debugService.mockData;
      readAll = debugService.mockUi;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      service.getUi().pipe(take(1)).subscribe((_) => {
        expect(Object.keys(_).length).toBe(Object.keys(debugService.mockUi).length);
        expect(_).toEqual(debugService.mockUi);
      });

      service.getEntities().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });

      service.getCv().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });
      service.getProjects().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });

      service.getGeneralTimeline().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });

      service.getVersion().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });
    }).not.toThrowError();
  });
});
