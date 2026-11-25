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
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { DataLoaderService } from './data-loader.service';
import { ChangeNotificationService } from '../change-notification/change-notification.service';

import { MockDataService } from '../mock-data/mock-data.service';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

// eslint-disable-next-line max-lines-per-function
describe('DataLoaderService', () => {
  let service: DataLoaderService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        DataLoaderService,
      ]
    });
    service = TestBed.inject(DataLoaderService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load', () => {
    expect(() => {
      service.LoadData();
    }).not.toThrow();
  });

  it('should notify data changed after loading', () => {
    let notifications = 0;
    const subscription = TestBed.inject(ChangeNotificationService).dataChanged$.subscribe(() => notifications++);
    debugService.dataService = TestBed.inject(MockDataService);
    service.LoadData();
    subscription.unsubscribe();
    expect(notifications).toBeGreaterThan(0);
    expect(debugService.model.ui).toBeDefined();
  });
  it('should keep sections loaded before the CV arrives', () => {
    debugService.dataService = TestBed.inject(MockDataService);
    const experience = [{ Id: 1 }];
    const education = [{ Id: 1 }];
    debugService.model.cv['Professional experience'] = experience;
    debugService.model.cv.Education = education;
    debugService.getCv();
    expect(debugService.model.cv['Professional experience']).toBe(experience);
    expect(debugService.model.cv.Education).toBe(education);
    expect(debugService.model.cv.Languages.length).toBeGreaterThan(0);
  });
  it('should load empty data', () => {
    expect(() => {
      debugService.dataService.getOntology = () => of([]);
      debugService.dataService.getUi = () => of([]);
      debugService.dataService.getEntities = () => of({});
      debugService.dataService.getCv = () => of({});
      debugService.dataService.getProfessionalExperience = () => of([]);
      debugService.dataService.getEducation = () => of([]);
      debugService.dataService.getAccomplishments = () => of([]);
      debugService.dataService.getPublications = () => of([]);
      debugService.dataService.getProjects = () => of([]);
      debugService.dataService.getGeneralTimeline = () => of([]);

      debugService.LoadData();
    }).not.toThrow();
  });

  it('should skip a failed load and keep loading the rest', () => {
    debugService.dataService = TestBed.inject(MockDataService);
    debugService.dataService.getEntities = () => throwError(() => new Error('entities failed'));
    debugService.dataService.getProjects = () => throwError(() => 'projects failed');
    let notifications = 0;
    const subscription = TestBed.inject(ChangeNotificationService).dataChanged$.subscribe(() => notifications++);
    expect(() => service.LoadData()).not.toThrow();
    subscription.unsubscribe();
    expect(notifications).toBeGreaterThan(0);
    expect(debugService.model.ui).toBeDefined();
  });

  it('should check isEmpty', () => {
    expect(() => {
      let readAll;
      readAll = service.isEmpty({});
      readAll = service.isEmpty([]);
    }).not.toThrow();
  });

  it('should check public interface methods', () => {
    expect(() => {
      debugService.model.entities = TestingCommon.chaosDecorateType(debugService.model.entities);
      const readAll = debugService.entitiesAdjusterService.adjustEntities(debugService.model.entities);
      debugService.model.entities = TestingCommon.chaosUndecorateType(debugService.model.entities);
    }).not.toThrow();
  });

  it('should check private methods', () => {
    expect(() => {
      let readAll;
      [['Project'], []].forEach((_) => readAll = debugService.countCacheService.calcCountCache(_));
      readAll = debugService.initializeStrings([{ key: 'content' }, { key: null }], ['key', 'another key']);
    }).not.toThrow();
  });
});
