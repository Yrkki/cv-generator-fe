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
/* eslint-disable max-len */
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ExcelDateFormatterService } from './excel-date-formatter.service';

// eslint-disable-next-line max-lines-per-function
describe('ExcelDateFormatterService', () => {
  let service: ExcelDateFormatterService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ExcelDateFormatterService,
      ]
    });
    service = TestBed.inject(ExcelDateFormatterService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = service.formatDate(12345);
      readAll = service.getJsDateValueFromExcel(23456);
      readAll = service.getJsDateValueFromExcel('23456');
      readAll = service.formatDates(['From', 'To'], 'From', 45678);
      readAll = service.inTheFuture(45678);
    }).not.toThrowError();
  });
});
