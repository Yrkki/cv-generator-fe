import { TestBed } from '@angular/core/testing';

import { PersistenceService } from './persistence.service';
import { Indexable } from '../../classes/indexable';
import { TestingCommon } from 'src/app/classes/testing-common/testing-common.spec';

// eslint-disable-next-line max-lines-per-function
describe('PersistenceService', () => {
  let service: PersistenceService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenceService);
    debugService = service as any;
  });

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
      const readAll = service.getToggleValue('Curriculum Vitae');
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
