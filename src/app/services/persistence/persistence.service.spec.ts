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
    expect(() => {
      const typeName = 'Portfolio';
      const readAll = service.restoreToggle(document, typeName);
    }).not.toThrowError();
  });

  it('should check setTitleWhenNeeded', () => {
    expect(() => {
      const typeName = 'Portfolio';
      const typeElement = document.getElementById(typeName);
      const readAll = debugService.setTitleWhenNeeded('collapse', typeElement);
    }).not.toThrowError();
  });

  it('should test restoreToggleAllSections', () => {
    expect(() => {
      debugService.portfolioModel.entities = TestingCommon.chaosDecorateType(debugService.portfolioModel.entities);
      const readAll = service.restoreToggleAllSections();
      debugService.portfolioModel.entities = TestingCommon.chaosUndecorateType(debugService.portfolioModel.entities);
    }).not.toThrowError();
  });

  it('should check saveToggle event handler', () => {
    expect(() => {
      let readAll;
      readAll = service.saveToggle(new MouseEvent('click'));
      readAll = service.saveToggle(new MouseEvent('click', { ctrlKey: true }));
    }).not.toThrowError();
  });

  it('should check getToggle', () => {
    expect(() => {
      const key = 'Portfolio';
      const readAll = service.getToggle(key);
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.getToggleValue('Curriculum Vitae');
      readAll = service.key(9);

      readAll = debugService.getToggle('key');
      readAll = debugService.setToggle('key', false);
      readAll = debugService.calcTitle(false);
      [undefined, document.createElement('div')].forEach((element) => {
        readAll = debugService.storeToggle('key', element, 'contentClass');
        if (element) { readAll = debugService.setTitle(element, (_: any) => _); }
      });
    }).not.toThrowError();
  });

  it('should check public interface falsy methods', () => {
    expect(() => {
      let readAll;

      readAll = service.restoreToggle(document, 'test');
      readAll = service.getToggle('test');
    }).not.toThrowError();
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
    expect(() => {
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

      readAll = service.storage.storage;
    }).not.toThrowError();
  });
});
