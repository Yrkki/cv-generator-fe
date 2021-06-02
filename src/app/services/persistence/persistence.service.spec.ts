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
  let entities: Entities;
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
      entities = e;
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

  it('should test restoreToggleAllSections', () => {
    expect(() => {
      debugService.portfolioModel.entities = TestingCommon.decorateType(debugService.portfolioModel.entities);
      const readAll = service.restoreToggleAllSections();
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

  // eslint-disable-next-line max-lines-per-function
  it('should test storage', () => {
    // eslint-disable-next-line max-lines-per-function, complexity
    expect(() => {
      let readAll;

      const storage = new Indexable<string>();
      for (let index = 0; index < service.length; index++) {
        const key = service.key(index);
        if (key !== null) {
          const value = service.getItem(key);
          if (value !== null) {
            storage[key] = value;
          }
        }
      }

      const testKey = 'test';
      readAll = service.getItem(testKey);
      service.setItem(testKey, 'test value');
      readAll = service.getItem(testKey);
      readAll = service.removeItem(testKey);
      readAll = service.storage;

      service.clear();
      for (const key in storage) {
        if (Object.prototype.hasOwnProperty.call(storage, key)) {
          const value = storage[key];
          service.setItem(key, value);
        }
      }

      readAll = service.storage.storage;
    }).not.toThrowError();
  });
});
