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
import { beforeEach, describe, expect, it } from 'vitest';

import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MapService } from './map.service';

// eslint-disable-next-line max-lines-per-function
describe('MapService', () => {
  let service: MapService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        MapService,
      ]
    });
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
    }).not.toThrow();
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
    }).not.toThrow();
  });

  it('should locate countries by ISO-3 code and keep their names as text', () => {
    const frequencies = [['🇬🇧 UK', { Count: 2 }], ['Atlantis', { Count: 1 }]];
    const { data } = service.prepareMap(frequencies, ['🇧🇬 Bulgaria']);
    expect(data[0].locationmode).toBe('ISO-3');
    expect(data[0].locations).toEqual(['BGR', 'GBR', 'Atlantis']);
    expect(data[0].text).toEqual(['🇧🇬 Bulgaria', '🇬🇧 UK', 'Atlantis']);
  });
});
