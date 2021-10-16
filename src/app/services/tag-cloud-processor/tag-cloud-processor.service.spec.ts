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
import { HttpClientModule } from '@angular/common/http';

import { TagCloudProcessorService } from './tag-cloud-processor.service';
import { ExcelDateFormatterService } from '../excel-date-formatter/excel-date-formatter.service';
import { MockDataService } from '../mock-data/mock-data.service';

// eslint-disable-next-line max-lines-per-function
describe('TagCloudProcessorService', () => {
  let service: TagCloudProcessorService;
  let mockDataService: MockDataService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        TagCloudProcessorService,
        ExcelDateFormatterService,
      ]
    });
    service = TestBed.inject(TagCloudProcessorService);
    mockDataService = TestBed.inject(MockDataService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate frequencies', () => {
    expect(() => {
      let readAll;
      const frequencies = mockDataService.mockData.frequencies;
      readAll = service.calcFrequencies(undefined, 'Name');
      readAll = service.calcFrequencies(undefined, 'Name', ', ');
      readAll = service.calcFrequencies(frequencies, 'Name', ', ', false);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = service.getLabel('0', '10');
      readAll = service.getShortLabel('0', '10', 75);
      readAll = service.addSignificance('label', 75, 100);
      readAll = service.addMaximality('label', 75, 0, 100);

      const newWordCount = debugService.newWordCount([], 10, 0, 10, 'i');
      readAll = newWordCount?.Label;
      readAll = newWordCount?.ShortLabel;

      readAll = service.replaceAll('undefined', 'test', 'test');
      readAll = debugService.capitalize('test');

      readAll = debugService.applyLexicalAnalysisEuristics('token');
      readAll = debugService.applyLexicalAnalysisEuristics('token', ', ');
    }).not.toThrowError();
  });
});
