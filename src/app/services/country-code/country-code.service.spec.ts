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

import { TestBed } from '@angular/core/testing';

import { CountryCodeService } from './country-code.service';

// eslint-disable-next-line max-lines-per-function
describe('CountryCodeService', () => {
  let service: CountryCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert plain country names', () => {
    expect(service.iso3('Bulgaria')).toBe('BGR');
    expect(service.iso3('Czech Republic')).toBe('CZE');
    expect(service.iso3('  norway  ')).toBe('NOR');
  });

  it('should convert country names prefixed with their flags', () => {
    expect(service.iso3('🇧🇬 Bulgaria')).toBe('BGR');
    expect(service.iso3('🇲🇰 Macedonia')).toBe('MKD');
    expect(service.iso3('🇬🇧 UK')).toBe('GBR');
  });

  it('should not convert unknown names', () => {
    expect(service.iso3('Atlantis')).toBeUndefined();
    expect(service.iso3('')).toBeUndefined();
  });
});
