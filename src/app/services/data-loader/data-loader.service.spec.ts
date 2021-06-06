import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { DataLoaderService } from './data-loader.service';

import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

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

  it('should load empty data', () => {
    expect(() => {
      debugService.dataService.getUi = () => of([]);
      debugService.dataService.getEntities = () => of({});
      debugService.dataService.getCv = () => of({});
      debugService.dataService.getProfessionalExperience = () => of([]);
      debugService.dataService.getEducation = () => of([]);
      debugService.dataService.getAccomplishments = () => of([]);
      debugService.dataService.getPublications = () => of([]);
      debugService.dataService.getProjects = () => of([]);
      debugService.dataService.getGeneralTimeline = () => of([]);

      debugService.LoadData();
    }).not.toThrowError();
  });

  it('should check isEmpty', () => {
    expect(() => {
      let readAll;
      readAll = service.isEmpty({});
      readAll = service.isEmpty([]);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      const entities = debugService.portfolioModel.entities;
      debugService.portfolioModel.entities = TestingCommon.decorateType(debugService.portfolioModel.entities);
      const readAll = debugService.entitiesAdjusterService.adjustEntities(debugService.portfolioModel.entities);
      debugService.portfolioModel.entities = entities;
    }).not.toThrowError();
  });
});
