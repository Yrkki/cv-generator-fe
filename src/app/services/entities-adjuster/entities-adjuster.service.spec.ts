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
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take } from 'rxjs/operators';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { Entities } from '../../classes/entities/entities';

import { EntitiesAdjusterService } from './entities-adjuster.service';
import { MockDataService } from '../mock-data/mock-data.service';

// eslint-disable-next-line max-lines-per-function
describe('EntitiesAdjusterService', () => {
  let service: EntitiesAdjusterService;
  let dataService: MockDataService;
  let debugService: any;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EntitiesAdjusterService,
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EntitiesAdjusterService);
    dataService = TestBed.inject(MockDataService);
    debugService = service as any;

    await dataService.getEntities().pipe(take(1)).subscribe((e: any) => {
      e = e as Entities;
      for (const key in e) {
        if (Object.prototype.hasOwnProperty.call(e, key)) { e[key].key = key; }
      }
      debugService.countCacheService.model.entities = e;
    });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check private interface properties', () => {
    expect(() => {
      let readAll;

      readAll = debugService.entityIds;

      readAll = debugService.chartService;
      readAll = debugService.countCacheService;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      debugService.countCacheService.model.entities =
        TestingCommon.chaosDecorateType(debugService.countCacheService.model.entities);

      const entities = debugService.countCacheService.model.entities;

      const readAll = service.adjustEntities(entities);

      debugService.countCacheService.model.entities =
        TestingCommon.chaosUndecorateType(debugService.countCacheService.model.entities);
    }).not.toThrowError();
  });

  it('should check private interface methods', () => {
    expect(() => {
      let readAll;

      debugService.countCacheService.model.entities =
        TestingCommon.chaosDecorateType(debugService.countCacheService.model.entities);

      const entities = debugService.countCacheService.model.entities;

      const key = entities.Certifications.key;
      const entity = entities[key];
      readAll = debugService.adjustEntityKeys(key, entity);
      readAll = debugService.adjustEntitySection(key, entity);
      readAll = debugService.adjustEntityOther(key, entity);

      readAll = debugService.variantName(key, entity.displayColumns);

      debugService.countCacheService.model.entities =
        TestingCommon.chaosUndecorateType(debugService.countCacheService.model.entities);
    }).not.toThrowError();
  });

  it('should check wrong entity ids', () => {
    let readAll;

    const entities = debugService.countCacheService.model.entities;

    const key = entities.Certifications.key;
    const entity = entities[key];

    readAll = debugService.adjustEntityKeys('non-Certifications', entity);
    debugService.entityIds = { Certifications: null };
    readAll = debugService.adjustEntityKeys(key, entity);
    expect(service).toBeTruthy();
  });
});
