// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { EntitiesService } from './entities.service';
import { MockDataService } from '../mock-data/mock-data.service';

import { Indexable } from '../../interfaces/indexable';
import { Entities } from '../../interfaces/entities/entities';
import { Publication } from '../../interfaces/cv/publication';

// eslint-disable-next-line max-lines-per-function
describe('EntitiesService', () => {
  let service: EntitiesService;
  let dataService: MockDataService;
  let entities: Entities;
  let publications: Indexable<Publication>[];
  let debugService: any;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();

    service = TestBed.inject(EntitiesService);
    dataService = TestBed.inject(MockDataService);
    debugService = service as any;

    await dataService.getEntities().pipe(take(1)).subscribe((e: any) => {
      e = e as Entities;
      for (const key in e) {
        if (Object.prototype.hasOwnProperty.call(e, key)) { e[key].key = key; }
      }
      debugService.portfolioService.model.portfolioModel.entities = e;
      entities = e;
    });
    await dataService.getPublications().pipe(take(1)).subscribe((p: any) => {
      p = p as Indexable<Publication>[];
      for (const key in p) {
        if (Object.prototype.hasOwnProperty.call(p, key)) { p[key].key = key; }
      }
      publications = p;
    });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check count values', () => {
    expect(() => {
      let readAll;
      for (const key in entities) {
        if (Object.prototype.hasOwnProperty.call(entities, key)) {
          readAll = service.getCountValue(key);
          debugService.entitiesModel.countCache[key] = 1;
          readAll = service.getCountValue(key);
          debugService.aggregateCountValue = (k: string) => 2;
          readAll = service.getCountValue(key);
        }
      }
    }).not.toThrowError();
  });

  it('should check count value help methods', () => {
    expect(() => {
      let readAll;
      for (const key in entities) {
        if (Object.prototype.hasOwnProperty.call(entities, key)) {
          readAll = service.getCountValueFormatted(key);

          readAll = debugService.aggregateCountValue(key);

          readAll = debugService.getFixedOrCacheCountValue(key);
          readAll = debugService.getCountValueProjects(key);
          readAll = debugService.getCountValueProjectSubsections(key);
          readAll = debugService.getCountValueFooter(key);

          readAll = debugService.aggregate(undefined, 'test');
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
      readAll = service.count(publications, 'Publication');
    }).not.toThrowError();
  });

  it('should check public interface falsy methods', () => {
    expect(() => {
      const readAll = service.count(new Array<Indexable>(), 'test');
    }).not.toThrowError();
  });
});
