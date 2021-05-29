import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { GanttChartService } from './gantt-chart.service';

// eslint-disable-next-line max-lines-per-function
describe('GanttChartService', () => {
  let service: GanttChartService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        GanttChartService,
      ]
    });
    service = TestBed.inject(GanttChartService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate a chart', () => {
    // tslint:disable-next-line: no-invalid-this
    const chartConfiguration = service.addChart.apply(service, TestingCommon.addChartArguments());
    expect(chartConfiguration).toBeTruthy();
  });

  it('should check public interface methods', () => {
    expect(() => {
      const readAll = debugService.ticks(0, 0, []);
    }).not.toThrowError();
  });
});
