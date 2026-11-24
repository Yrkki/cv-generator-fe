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
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Indexable } from '../../interfaces/indexable';

import { TruncatorService } from './truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { ToggleService } from '../../services/toggle/toggle.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

// eslint-disable-next-line max-lines-per-function
describe('TruncatorService', () => {
  const truncatorService: Indexable<TruncatorService> = {
    Cv: {} as TruncatorService,
    Ps: {} as TruncatorService,
    Pp: {} as TruncatorService
  };

  let persistenceService: PersistenceService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        TruncatorService,
      ]
    });
    TruncatorServiceFactory.TruncatorKindValues.forEach((truncatorKind) => {
      truncatorService[TruncatorKind[truncatorKind]] = TestBed.inject(TruncatorServiceFactory.InjectionToken(truncatorKind,
        persistenceService = TestBed.inject(PersistenceService)
      ));
    });
  });

  it('should be created', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(service).toBeTruthy();
    });
  });

  describe('with the main entities loaded', () => {
    let entities: unknown;

    beforeEach(() => {
      entities = persistenceService.entitiesModel.entities;
      (persistenceService.entitiesModel as Indexable).entities = {
        'Curriculum Vitae': { main: 'true' },
        'Personal Data': {},
        'Project Summary': { main: 'true' },
        'Project Portfolio': { main: 'true' },
        'Project type': {},
        'General Timeline': { main: 'true' },
      };
    });

    afterEach(() => {
      (persistenceService.entitiesModel as Indexable).entities = entities;
    });

    it('should infer the entity key from the main entity acronyms', () => {
      expect(truncatorService['Cv'].entityKey).toBe('Curriculum Vitae');
      expect(truncatorService['Ps'].entityKey).toBe('Project Summary');
      expect(truncatorService['Pp'].entityKey).toBe('Project Portfolio');
    });

    it('should read the tag cloud emphasis from its long key', () => {
      expect(truncatorService['Cv'].tagCloudEmphasis.persistenceName).toBe('Curriculum Vitae tag cloud emphasis');
      [true, false].forEach((value) => {
        persistenceService.setItem('Project Summary tag cloud emphasis', value.toString());
        expect(truncatorService['Ps'].TagCloudEmphasis).toBe(value);
      });
    });

    it('should have no entity key for an unknown truncator kind', () => {
      const service = truncatorService['Cv'];
      const truncatorKind = service.truncatorKind;
      service.truncatorKind = -1 as TruncatorKind;
      expect(service.entityKey).toBe('');
      service.truncatorKind = truncatorKind;
    });
  });

  it('should have no entity key before the entities are loaded', () => {
    const entities = persistenceService.entitiesModel.entities;
    (persistenceService.entitiesModel as Indexable).entities = undefined;
    expect(truncatorService['Cv'].entityKey).toBe('');
    (persistenceService.entitiesModel as Indexable).entities = entities;
  });

  it('should check public interface properties', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        let readAll;
        service.truncatorKind = service.truncatorKind;

        service.TagCloudEmphasis = service.TagCloudEmphasis;

        service.FocusThreshold = service.FocusThreshold;
        service.persistenceService.getItem = () => null;
        service.FocusThreshold = service.FocusThreshold;

        readAll = TruncatorServiceFactory.TruncatorKindValues;
        readAll = TruncatorServiceFactory.providers;
      }).not.toThrow();
    });
  });

  it('should check focusThreshold subContext public interface properties', () => {
    Object.values(truncatorService).forEach((service) => {
      let readAll;
      readAll = service.focusThreshold;
      readAll = service.focusThreshold.truncatorKind;
      readAll = service.focusThreshold.default;
      readAll = service.focusThreshold.persistenceName;
      readAll = service.focusThreshold.displayValue;
      readAll = service.focusThreshold.propertyName;
      ToggleService.displayValues.get = () => undefined;
      readAll = service.focusThreshold.displayValue;
      expect(service).toBeTruthy();
    });
  });

  it('should check tagCloudEmphasis subContext public interface properties', () => {
    Object.values(truncatorService).forEach((service) => {
      let readAll;
      readAll = service.tagCloudEmphasis;
      readAll = service.tagCloudEmphasis.truncatorKind;
      readAll = service.tagCloudEmphasis.persistenceName;
      readAll = service.tagCloudEmphasis.displayValue;
      ToggleService.displayValues.get = () => undefined;
      readAll = service.tagCloudEmphasis.displayValue;
      expect(service).toBeTruthy();
    });
  });

  it('should check public interface methods', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        let readAll;
        readAll = TruncatorServiceFactory.tokenDescription(TruncatorKind.Pp);
        TruncatorServiceFactory.TruncatorKindValues.forEach((truncatorKind) => {
          const deps = [persistenceService];
          readAll = TruncatorServiceFactory.InjectionToken(truncatorKind, deps);
          readAll = TruncatorServiceFactory.useFactory(truncatorKind, deps);
        });

        readAll = service.truncated([]);
        readAll = service.remaining([]);
        readAll = service.remainingLength([]);

        debugService = service as any;
        readAll = debugService.truncated(undefined);
        readAll = debugService.remaining(undefined);
        readAll = debugService.remainingLength(undefined);

        readAll = service.modelChange('readAll', 5);
      }).not.toThrow();
    });
  });
});
