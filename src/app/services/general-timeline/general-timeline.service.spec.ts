import { TestBed, inject } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { GeneralTimelineService } from './general-timeline.service';

describe('GeneralTimelineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralTimelineService]
    });
  });

  it('should be created', inject([GeneralTimelineService], (service: GeneralTimelineService) => {
    expect(service).toBeTruthy();
  }));

  it('should check public interface', inject([GeneralTimelineService], (service: GeneralTimelineService) => {
    expect(() => {
      let readAll;
      readAll = service.optionsScalesXAxes0Ticks;

      // tslint:disable-next-line: no-invalid-this
      readAll = service.addChart.apply(service, TestingCommon.addChartArguments());
      readAll = service.data;
    }).not.toThrowError();
  }));
});
