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

import { InputService } from './input.service';

// eslint-disable-next-line max-lines-per-function
describe('InputService', () => {
  let service: InputService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      let readAll;
      readAll = service.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
      readAll = service.keypress(new KeyboardEvent('keypress', { key: 'T' }));
    }).not.toThrowError();
  });

  it('should process keypress enter', () => {
    expect(() => {
      const readAll = debugService.processKeypressEnter(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });
});
