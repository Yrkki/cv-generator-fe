import { TestBed, inject } from '@angular/core/testing';

import { GanttChartService } from './gantt-chart.service';

describe('GanttChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GanttChartService]
    });
  });

  it('should be created', inject([GanttChartService], (service: GanttChartService) => {
    expect(service).toBeTruthy();
  }));
});
