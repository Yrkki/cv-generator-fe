import { TestBed } from '@angular/core/testing';

import { EntitiesService } from './entities.service';
import { Indexable } from '../../interfaces/indexable';
import { HttpClientModule } from '@angular/common/http';

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

  it('should check public interface falsy methods', () => {
    expect(() => {
      let readAll;
      readAll = service.count(new Array<Indexable>(), 'test');
    }).not.toThrowError();
  });
});
