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

import { MapService } from './map.service';

// eslint-disable-next-line max-lines-per-function
describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.countriesVisited;
      readAll = service.entity;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      const frequencies = [
        ['Bulgaria', { Count: 15, Percentage: 44, Lightness: 0 }],
        ['Norway', { Count: 10, Percentage: 29, Lightness: 20 }]
      ];
      const countriesVisited = ['Russia', 'Ukraine', 'Romania', 'Hungary'];
      readAll = service.prepareMap(frequencies, countriesVisited);
      readAll = service.prepareMap([], countriesVisited);
    }).not.toThrowError();
  });
});
