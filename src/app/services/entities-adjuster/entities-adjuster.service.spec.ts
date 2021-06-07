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
      debugService.countCacheService.portfolioModel.entities = e;
    });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;

      debugService.countCacheService.portfolioModel.entities =
        TestingCommon.chaosDecorateType(debugService.countCacheService.portfolioModel.entities);

      const entities = debugService.countCacheService.portfolioModel.entities;

      readAll = service.adjustEntities(entities);

      const key = entities.Certifications.key;
      const entity = entities[key];
      readAll = debugService.adjustEntityKeys(key, entity);
      readAll = debugService.adjustEntitySection(key, entity);
      readAll = debugService.adjustEntityOther(key, entity);

      readAll = debugService.variantName(key, entity.displayColumns);

      debugService.countCacheService.portfolioModel.entities =
        TestingCommon.chaosUndecorateType(debugService.countCacheService.portfolioModel.entities);
    }).not.toThrowError();
  });
});
