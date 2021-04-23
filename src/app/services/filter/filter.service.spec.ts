import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';
import { HttpClientModule } from '@angular/common/http';
import { Project } from '../../classes/project/project';

// eslint-disable-next-line max-lines-per-function
describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        FilterService,
      ]
    });
    service = TestBed.inject(FilterService);
  });

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

      ['test project', 'Database applications'].forEach((_) =>
        readAll = service.projectFrequency({ 'Project name': _ } as Project)
      );
    }).not.toThrowError();
  });
});
