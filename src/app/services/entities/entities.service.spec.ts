import { TestBed } from '@angular/core/testing';

import { EntitiesService } from './entities.service';
import { Indexable } from '../../interfaces/indexable';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('EntitiesService', () => {
  let service: EntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(EntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check count values', () => {
    expect(() => {
      let readAll;
      for (const key in service.entities) {
        if (Object.prototype.hasOwnProperty.call(service.entities, key)) {
          readAll = service.getCountValue(key);
          readAll = service.getCountValueFormatted(key);
        }
      }
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.count(new Array<Indexable>(), 'Publication', '~');
      readAll = service.count(new Array<Indexable>(), 'Publication');
      readAll = service.count(new Array<Indexable>(), 'Personal data', '~');
      readAll = service.count(new Array<Indexable>(), 'Personal data');
    }).not.toThrowError();
  });

  it('should check public interface falsy methods', () => {
    expect(() => {
      const readAll = service.count(new Array<Indexable>(), 'test');
    }).not.toThrowError();
  });
});
