import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FilterService } from './filter.service';
import { Project } from '../../classes/project/project';

import { MockDataService } from '../mock-data/mock-data.service';
import { take } from 'rxjs/operators';

// eslint-disable-next-line max-lines-per-function
describe('FilterService', () => {
  let service: FilterService;
  let dataService: MockDataService;
  let debugService: any;

  // eslint-disable-next-line max-lines-per-function
  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        FilterService,
      ]
    });
    service = TestBed.inject(FilterService);
    dataService = TestBed.inject(MockDataService);
    debugService = service as any;

    await dataService.getCv().pipe(take(1)).subscribe(async (cv: any) => {
      debugService.portfolioModel.cv = cv;
    });
    await dataService.getProjects().pipe(take(1)).subscribe((projects: any) => {
      debugService.portfolioModel.projects = projects;
    });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.data;
      readAll = service.data.cv;
      readAll = service.data.entities;
      readAll = service.data.projects;
      readAll = service.data.ui;
      readAll = service.emptyFrequency;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.getEmptyFrequency('test frequency');
      readAll = (readAll[1] as any).ShortLabel;

      ['test project', 'Database applications'].forEach((_) =>
        readAll = service.projectFrequency({ 'Project name': _ } as Project)
      );
    }).not.toThrowError();
  });

  it('should check private methods', () => {
    expect(() => {
      let readAll;

      [['Project'], []].forEach((_) => readAll = debugService.countCacheService.calcCountCache(_));
      readAll = debugService.calcFilteredProjects();
      readAll = debugService.calcFilteredLanguages();
      readAll = debugService.calcFilteredAccomplishments();
      readAll = debugService.calcFilteredPublications();

      debugService.portfolioModel.projects = undefined;
      readAll = debugService.calcFilteredProjects();
      debugService.portfolioModel.cv = undefined;
      readAll = debugService.calcFilteredLanguages();
      readAll = debugService.calcFilteredAccomplishments();
      readAll = debugService.calcFilteredPublications();
    }).not.toThrowError();
  });
});
