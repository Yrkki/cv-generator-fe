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

import { PersistenceService } from './persistence.service';
import { Indexable } from '../../classes/indexable';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';
import { MockDataService } from '../mock-data/mock-data.service';
import { Entities } from '../../classes/entities/entities';
import { take } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('PersistenceService', () => {
  let service: PersistenceService;
  let dataService: MockDataService;
  let debugService: any;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        PersistenceService,
      ]
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenceService);
    dataService = TestBed.inject(MockDataService);
    debugService = service as any;

    await dataService.getEntities().pipe(take(1)).subscribe((e: any) => {
      e = e as Entities;
      for (const key in e) {
        if (Object.prototype.hasOwnProperty.call(e, key)) { e[key].key = key; }
      }
      debugService.portfolioModel.entities = e;
    });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check restoreToggle', () => {
    const typeName = 'Portfolio';
    const readAll = service.restoreToggle(document, typeName);
    expect(service).toBeTruthy();
  });

  it('should check setTitleWhenNeeded', () => {
    let readAll;
    ['collapse', 'collapse'].forEach((toggle) => {
      [null, document.createElement('test-span') as HTMLSpanElement].forEach((typeElement) => {
        readAll = debugService.setTitleWhenNeeded(toggle, typeElement);
      });
    });
    expect(service).toBeTruthy();
  });

  it('should test restoreToggleAllSections', () => {
    debugService.portfolioModel.entities = TestingCommon.chaosDecorateType(debugService.portfolioModel.entities);
    const readAll = service.restoreToggleAllSections();
    debugService.portfolioModel.entities = TestingCommon.chaosUndecorateType(debugService.portfolioModel.entities);
    expect(service).toBeTruthy();
  });

  it('should check saveToggle event handler', () => {
    let readAll;
    readAll = service.saveToggle(new MouseEvent('click'));
    readAll = service.saveToggle(new MouseEvent('click', { ctrlKey: true }));
    expect(service).toBeTruthy();
  });

  it('should check saveToggle event handler with blank target', () => {
    let readAll;
    [null, document.createElement('test-span') as HTMLSpanElement].forEach((span) => {
      readAll = service.saveToggle({ target: span, stopPropagation: () => { } } as unknown as MouseEvent);
    });
    expect(service).toBeTruthy();
  });

  it('should check getToggle', () => {
    const key = 'Portfolio';
    const readAll = service.getToggle(key);
    expect(service).toBeTruthy();
  });

  it('should check public interface methods', () => {
    let readAll;
    readAll = service.getToggleValue('Curriculum Vitae');
    readAll = service.key(9);

    [true, false].forEach((_) => {
      readAll = debugService.getToggle('key');
    });
    [true, false].forEach((_) => {
      readAll = debugService.setToggle('key', _);
    });
    readAll = debugService.calcTitle(false);
    [undefined, document.createElement('div')].forEach((element) => {
      readAll = debugService.storeToggle('key', element, 'contentClass');
      if (element) { readAll = debugService.setTitle(element, (_: any) => _); }
    });
    expect(service).toBeTruthy();
  });

  it('should check public interface falsy methods', () => {
    let readAll;

    readAll = service.restoreToggle(document, 'test');
    readAll = service.getToggle('test');
    expect(service).toBeTruthy();
  });

  const saveServiceToStorage = (storage: Indexable<string>) => {
    for (let index = 0; index < service.length; index++) {
      const key = service.key(index);
      if (key !== null) {
        const value = service.getItem(key);
        if (value !== null) {
          storage[key] = value;
        }
      }
    }
  };

  const restoreServiceFromStorage = (storage: Indexable<string>) => {
    service.clear();
    for (const key in storage) {
      if (Object.prototype.hasOwnProperty.call(storage, key)) {
        const value = storage[key];
        service.setItem(key, value);
      }
    }
  };

  it('should test storage', () => {
    let readAll;

    const storage = new Indexable<string>();
    saveServiceToStorage(storage);

    const testKey = 'test';
    readAll = service.getItem(testKey);
    service.setItem(testKey, 'test value');
    readAll = service.getItem(testKey);
    readAll = service.removeItem(testKey);
    readAll = service.storage;

    restoreServiceFromStorage(storage);
    expect(service).toBeTruthy();
  });
});
