/* eslint-disable max-len */
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { GeneralTimelineService } from './general-timeline.service';

// eslint-disable-next-line max-lines-per-function
describe('GeneralTimelineService', () => {
  let service: GeneralTimelineService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        GeneralTimelineService,
      ]
    });
    service = TestBed.inject(GeneralTimelineService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = service.optionsScalesXAxes0Ticks;

      // tslint:disable-next-line: no-invalid-this
      readAll = service.addChart.apply(service, TestingCommon.addChartArguments());
      readAll = service.data;
    }).not.toThrowError();
  });
});
