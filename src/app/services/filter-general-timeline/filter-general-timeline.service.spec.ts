import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { FilterGeneralTimelineService } from './filter-general-timeline.service';
import { MockDataService } from '../mock-data/mock-data.service';

// eslint-disable-next-line max-lines-per-function
describe('FilterGeneralTimelineService', () => {
  let service: FilterGeneralTimelineService;
  let dataService: MockDataService;
  let debugService: any;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        FilterGeneralTimelineService,
      ]
    });
    service = TestBed.inject(FilterGeneralTimelineService);
    dataService = TestBed.inject(MockDataService);
    debugService = service as any;

    await dataService.getGeneralTimeline().pipe(take(1)).subscribe((gt: any) => {
      debugService.portfolioModel.generalTimeline = gt;
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
      readAll = service.calcFilteredTimelineEvents();

      readAll = debugService.calcFilteredTimelineEventsPart(debugService.generalTimeline, ['Lorem i']);
    }).not.toThrowError();
  });
});
