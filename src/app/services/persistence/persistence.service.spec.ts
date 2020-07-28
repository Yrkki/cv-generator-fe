import { TestBed } from '@angular/core/testing';

import { PersistenceService } from './persistence.service';
import { Indexable } from '../../classes/indexable';

describe('PersistenceService', () => {
  let service: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check restoreToggle', () => {
    expect(() => {
      let readAll;
      const typeName = 'Portfolio';
      readAll = service.restoreToggle(document, typeName);
    }).not.toThrowError();
  });

  it('should check saveToggle event handler', () => {
    expect(() => {
      let readAll;
      readAll = service.saveToggle(new MouseEvent('click'));
      readAll = service.saveToggle(new MouseEvent('click', { ctrlKey: true } ));
    }).not.toThrowError();
  });

  it('should check getToggle', () => {
    expect(() => {
      let readAll;
      const key = 'Portfolio';
      readAll = service.getToggle(key);
    }).not.toThrowError();
  });

  it('should check public interface falsy methods', () => {
    expect(() => {
      let readAll;

      readAll = service.restoreToggle(document, 'test');
      readAll = service.getToggle('test');
    }).not.toThrowError();
  });

  it('should test storage', () => {
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

      service.clear();
      for (const key in storage) {
        if (Object.prototype.hasOwnProperty.call(storage, key)) {
          const value = storage[key];
          service.setItem(key, value);
        }
      }
    }).not.toThrowError();
  });
});
