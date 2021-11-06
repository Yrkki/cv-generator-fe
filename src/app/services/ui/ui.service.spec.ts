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
import { HttpClientModule } from '@angular/common/http';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { UiService } from './ui.service';
import { StringExService } from '../../services/string-ex/string-ex.service';

// eslint-disable-next-line max-lines-per-function
describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(UiService);
    service.windowReload = TestingCommon.mockWindowReload;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check ui', () => { expect(() => { const readAll = service.ui; }).not.toThrowError(); });

  it('should check tabName', () => { expect(() => { const readAll = service.tabName('key'); }).not.toThrowError(); });
  it('should check linkLabel', () => { expect(() => { const readAll = service.linkLabel('key'); }).not.toThrowError(); });
  it('should check id', () => { expect(() => { const readAll = service.id('key'); }).not.toThrowError(); });
  it('should check label', () => { expect(() => { const readAll = service.label('key'); }).not.toThrowError(); });

  it('should check public interface falsy methods', () => {
    expect(() => {
      const readAll = service.linkLabel(undefined);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.componentName;
      readAll = service.frequenciesDivider;
      readAll = service.linkToThisSymbol;
      readAll = service.nonBreakingSpace;
      readAll = service.linkToThisText;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.uiText('');
      readAll = service.uiSlowText('');
      readAll = service.windowReload();

      const frequency = ['Bulgaria', { Count: 15, Percentage: 44, Lightness: 0 }];
      [true, false].forEach((emphasis) => {
        readAll = service.getFrequencyStyle(frequency, emphasis);
      });
    }).not.toThrowError();
  });

  it('should check replaceAll', () => {
    expect(() => {
      const readAll = StringExService.replaceAll('undefined', 'test', 'test');
    }).not.toThrowError();
  });

  it('should check public interface events', () => {
    expect(() => {
      service.tintedToggled$.emit(true);
      service.uiInvalidated$.emit(true);
    }).not.toThrowError();
  });
});
