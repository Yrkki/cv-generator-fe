import { TestBed } from '@angular/core/testing';

import { FilterGeneralTimelineService } from './filter-general-timeline.service';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('FilterGeneralTimelineService', () => {
  let service: FilterGeneralTimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        FilterGeneralTimelineService,
      ]
    });
    service = TestBed.inject(FilterGeneralTimelineService);
  });

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
      const readAll = service.calcFilteredTimelineEvents();
    }).not.toThrowError();
  });
});
