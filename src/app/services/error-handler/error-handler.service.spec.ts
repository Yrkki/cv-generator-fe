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
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { errorHandler, ErrorHandlerService } from './error-handler.service';

// eslint-disable-next-line max-lines-per-function
describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ErrorHandlerService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = errorHandler;
      readAll = ErrorHandlerService.instance;
      readAll = ErrorHandlerService.instance;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.globalErrorHandler({});
      readAll = service.globalErrorHandler({}, true);

      readAll = service.loggerErrorHandler({});

      readAll = service.silentErrorHandler();
      readAll = service.silentErrorHandler({});
    }).not.toThrowError();
  });
});
