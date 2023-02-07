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

import { ToolbarService } from './toolbar.service';
import { HttpClientModule } from '@angular/common/http';
import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

// eslint-disable-next-line max-lines-per-function
describe('ToolbarService', () => {
  let service: ToolbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ToolbarService,
      ]
    });
    service = TestBed.inject(ToolbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle decorations', () => {
    let readAll;
    const value = service.decorations;

    service.decorations = true;
    readAll = service.decorations;
    service.decorations = false;
    readAll = service.decorations;

    service.decorations = value;
    expect(service).toBeTruthy();
  });

  it('should toggle pagination', () => {
    let readAll;
    const value = service.pagination;

    service.pagination = true;
    readAll = service.pagination;
    service.pagination = false;
    readAll = service.pagination;

    service.pagination = value;
    expect(service).toBeTruthy();
  });

  it('should toggle tagCloud', () => {
    let readAll;
    const value = service.tagCloud;

    [
      TagCloudDisplayMode.tagCloud, TagCloudDisplayMode.chart, TagCloudDisplayMode.both,
      TagCloudDisplayMode.tagCloud, TagCloudDisplayMode.both, TagCloudDisplayMode.chart,
      0 as TagCloudDisplayMode,
    ].forEach((_) => {
      service.tagCloud = _;
      readAll = service.tagCloud;
    });

    service.persistenceService.setItem('tagCloud', '0');
    readAll = service.tagCloud;
    service.persistenceService.removeItem('tagCloud');
    readAll = service.tagCloud;

    service.tagCloud = value;
    expect(service).toBeTruthy();
  });

  it('should toggle columns', () => {
    let readAll;
    const value = service.columns;

    service.columns = value;
    readAll = service.columns;
    service.persistenceService.setItem('columns', '{}');
    readAll = service.columns;
    service.persistenceService.removeItem('columns');
    readAll = service.columns;

    service.columns = value;
    expect(service).toBeTruthy();
  });

  it('should toggle responsive', () => {
    let readAll;

    readAll = service.responsive();
    readAll = service.responsive('Language');
    readAll = service.responsive('Project Summary');
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    let readAll;
    service.model.countCache = service.model.countCache;

    readAll = service.editMode;
    readAll = service.tagCloudIsTagCloud;

    readAll = service.chartService;
    readAll = service.persistenceService;
    readAll = service.model;
    expect(service).toBeTruthy();
  });

  it('should check public interface methods', () => {
    let readAll;

    const item = 'test';
    [true, false].forEach((_) => {
      service.persistenceService.setItem('columns', `{"${item}": ${_}}`);
      service.columns[item] = _;

      readAll = service.getColumnsClass(item);
    });
    expect(service).toBeTruthy();
  });

  it('should check public interface events', () => {
    service.responsiveModelChanged$.emit({ sourceEntityKey: 'Language', value: true });
    expect(service).toBeTruthy();
  });
});
