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
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FilterService } from './filter.service';
import { Project } from '../../interfaces/project/project';

import { MockDataService } from '../mock-data/mock-data.service';
import { take } from 'rxjs/operators';

// eslint-disable-next-line max-lines-per-function
describe('FilterService', () => {
  let service: FilterService;
  let dataService: MockDataService;
  let debugService: any;

  // eslint-disable-next-line max-lines-per-function
  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        FilterService,
      ]
    });
    service = TestBed.inject(FilterService);
    dataService = TestBed.inject(MockDataService);
    debugService = service as any;

    await dataService.getCv().pipe(take(1)).subscribe(async (cv: any) => {
      debugService.model.cv = cv;
    });
    await dataService.getProjects().pipe(take(1)).subscribe((projects: any) => {
      debugService.model.projects = projects;
    });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    let readAll;
    readAll = service.data;
    readAll = service.data.cv;
    readAll = service.data.entities;
    readAll = service.data.projects;
    readAll = service.data.ui;
    readAll = service.emptyFrequency;
    expect(service).toBeTruthy();
  });

  it('should check public interface methods', () => {
    let readAll;
    readAll = service.getEmptyFrequency('test frequency');
    readAll = (readAll[1] as any).ShortLabel;

    ['test project', 'Database applications'].forEach((_) =>
      readAll = service.projectFrequency({ 'Project name': _ } as Project)
    );

    const frequencies: [string, Record<string, unknown>][] = [['asd', { asd: 'asd' }], ['bsd', { bsd: 'bsd' }]];
    debugService.model.frequenciesCache.Project = frequencies;
    readAll = service.projectFrequency({ 'Project name': 'bsd' } as Project);
    expect(service).toBeTruthy();
  });

  it('should check private methods', () => {
    let readAll;

    [['Project'], []].forEach((_) => readAll = debugService.countCacheService.calcCountCache(_));
    readAll = debugService.calcFilteredProjects();
    readAll = debugService.calcFilteredLanguages();
    readAll = debugService.calcFilteredAccomplishments();
    readAll = debugService.calcFilteredPublications();

    debugService.model.projects = undefined;
    readAll = debugService.calcFilteredProjects();
    debugService.model.cv = undefined;
    readAll = debugService.calcFilteredLanguages();
    readAll = debugService.calcFilteredAccomplishments();
    readAll = debugService.calcFilteredPublications();
    expect(service).toBeTruthy();
  });
});
