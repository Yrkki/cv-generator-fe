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

import { PortfolioService } from './portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { Project } from '../../interfaces/project/project';

// eslint-disable-next-line max-lines-per-function
describe('PortfolioService', () => {
  let service: PortfolioService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        PortfolioService,
      ]
    });
    service = TestBed.inject(PortfolioService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check generalTimelineDefined', () => {
    expect(() => {
      const readAll = service.generalTimelineDefined();
    }).not.toThrowError();
  });

  it('should check ui', () => { expect(() => { const readAll = service.model.ui; }).not.toThrowError(); });
  it('should check entities', () => { expect(() => { const readAll = service.model.entities; }).not.toThrowError(); });
  it('should check cv', () => { expect(() => { const readAll = service.model.cv; }).not.toThrowError(); });
  it('should check projects', () => { expect(() => { const readAll = service.model.projects; }).not.toThrowError(); });

  it('should check isEmpty', () => { expect(() => { const readAll = service.isEmpty({}); }).not.toThrowError(); });

  it('should check getFrequency', () => {
    let readAll: any;
    const frequenciesCacheKey = 'Organization';
    const propertyName = 'Name';
    readAll = service.getFrequency(frequenciesCacheKey, propertyName);

    service.checkToggleCollapsed = (_: string) => true;
    readAll = service.getFrequency(frequenciesCacheKey, propertyName);

    service.getFrequenciesCache = (_: string): any[] => [propertyName, [propertyName]];
    readAll = service.getFrequency(frequenciesCacheKey, propertyName);
    expect(service).toBeTruthy();
  });

  it('should check subscribe', () => {
    expect(() => {
      [undefined, 'ST', 'RM'].forEach((kind) => {
        const readAll = service.subscribe(kind as 'ST' | 'RM', (_: string) => { });
        readAll?.unsubscribe();
      });
    }).not.toThrowError();
  });

  it('should check project methods', () => {
    expect(() => {
      let readAll;

      const project = { Period: 'Renaissance' } as Project;

      readAll = service.getProjectIsOnePersonTeam(project);

      readAll = service.getProjectStartsNewPeriod(project);
      readAll = service.getProjectStartsNewPeriod(project);

      readAll = service.getDecryptedProjectPeriod(project);

      readAll = service.projectsDefined();
    }).not.toThrowError();
  });

  // eslint-disable-next-line max-lines-per-function
  it('should check public interface properties', () => {
    // eslint-disable-next-line max-statements
    expect(() => {
      service.model.countCache = service.model.countCache;

      service.model.filtered.Accomplishments = service.model.filtered.Accomplishments;
      service.model.filtered.Education = service.model.filtered.Education;
      service.model.filtered.ProfessionalExperience = service.model.filtered.ProfessionalExperience;
      service.model.filtered.Projects = service.model.filtered.Projects;
      service.model.filtered.Publications = service.model.filtered.Publications;

      let readAll;
      readAll = service.model.filtered;
      readAll = service.model.filtered.Certifications;
      readAll = service.model.filtered.Courses;
      readAll = service.model.filtered.Organizations;
      readAll = service.model.filtered.HonorsAndAwards;
      readAll = service.model.filtered.Volunteering;
      readAll = service.model.filtered.InterestsAndHobbies;
      readAll = service.model.filtered.Vacation;
      readAll = service.decryptedPeriod;
      readAll = service.currentProjectPeriod;
      readAll = service.toolbarService;
      readAll = service.persistenceService;
      readAll = service.engine;
      readAll = service.model;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;

      readAll = service.uiDefined();
      readAll = service.entitiesDefined();
      readAll = service.generalTimelineDefined();

      [undefined, { test: 'value' }].forEach((_) => { readAll = service.jsonDefined(_); });

      readAll = service.isEmpty({});
      readAll = service.isEmpty({ test: 'value' });
      readAll = debugService.isInitialized({ test: 'value' });

      const cacheKey = 'Certification';
      readAll = service.getFrequenciesCache(cacheKey);
      readAll = service.checkToggleCollapsed(cacheKey);

      const entityType = service.model.entities.Projects?.key || 'Projects';
    }).not.toThrowError();
  });
});
