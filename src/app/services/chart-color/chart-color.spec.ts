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
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { ChartColorService } from './chart-color.service';
import { HSLA } from './hsla';

// eslint-disable-next-line max-lines-per-function
describe('ChartColorService', () => {
  let service: ChartColorService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartColorService]
    });
    service = TestBed.inject(ChartColorService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      const readAll = service.chartModel;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.initColors();
      debugService.initialized = true;
      readAll = service.initColors();

      readAll = service.nextBackgroundColor();
      readAll = service.nextHoverBackgroundColor();

      const component = 'h';
      const color = { h: 1, s: 1, l: 1, a: 1 };
      readAll = debugService.normalizeColorComponent(color, component);
      debugService.backgroundColorRange[component].direction = - debugService.backgroundColorRange[component].direction;
      readAll = debugService.normalizeColorComponent(color, component);

      debugService.backgroundColorRange[component].step = 1;
      readAll = debugService.correctColor(component, 1, color);
      readAll = debugService.correctColor(component, -1, color);
    }).not.toThrowError();
  });

  it('should check decorateType behavior', () => {
    expect(() => {
      let readAll;

      debugService.backgroundColorRange = TestingCommon.chaosDecorateType(debugService.backgroundColorRange);

      readAll = debugService.Initialize();
      const color = { h: 1, s: 1, l: 1, a: 1 };
      readAll = debugService.initColor(color);
      readAll = debugService.nextColor(new HSLA());

      debugService.backgroundColorRange = TestingCommon.chaosUndecorateType(debugService.backgroundColorRange);
    }).not.toThrowError();
  });
});
