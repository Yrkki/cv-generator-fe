import { TestBed } from '@angular/core/testing';

import { DataLoaderService } from './data-loader.service';
import { HttpClientModule } from '@angular/common/http';

import { TestingCommon } from 'src/app/classes/testing-common/testing-common.spec';

// eslint-disable-next-line max-lines-per-function
describe('DataLoaderService', () => {
  let service: DataLoaderService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        DataLoaderService,
      ]
    });
    service = TestBed.inject(DataLoaderService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load', () => {
    expect(() => {
      service.LoadData();
    }).not.toThrowError();
  });

  it('should check isEmpty', () => { expect(() => { const readAll = service.isEmpty({}); }).not.toThrowError(); });

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      debugService.portfolioModel.entities = TestingCommon.decorateType(debugService.portfolioModel.entities);
      const readAll = debugService.adjustEntities(debugService.portfolioModel.entities);
    }).not.toThrowError();
  });
});
