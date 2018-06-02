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

  it('should calculate a chart', inject([GanttChartService], (service: GanttChartService) => {
    const chartConfiguration = service.addChart([
      {
        'Id': 1,
        'From': 43243,
        'To': 61543,
        'From Year': 2018,
        'From Month': 5,
        'Imported Name': 'Pluralsight Skill IQ in partnership with Stack Overflow',
        'Months total': 601,
        'Duration total': '601',
        'Name': 'Pluralsight Skill IQ in partnership with Stack Overflow',
        'Start': 2018.4166666666667,
        'Years total': 50.083333333333336,
        'Type': 'Certification',
        'Color': '#7F00FFC0'
      },
      {
        'Id': 1,
        'From': 43221,
        'To': 43252,
        'From Year': 2018,
        'From Month': 5,
        'Imported Name': 'Life Store (freelance)',
        'Months total': 1,
        'Duration total': '1 month',
        'Name': 'Life Store (freelance)',
        'Start': 2018.4166666666667,
        'Years total': 0.08333333333333333,
        'Type': 'Project',
        'Color': '#004000C0'
      }
    ], [
        {
          'Id': 1,
          'From': 43221,
          'To': 43252,
          'From Year': 2018,
          'From Month': 5,
          'Imported Name': 'Life Store (freelance)',
          'Months total': 1,
          'Duration total': '1 month',
          'Name': 'Life Store (freelance)',
          'Start': 2018.4166666666667,
          'Years total': 0.08333333333333333,
          'Type': 'Project',
          'Color': '#004000C0'
        }
      ]);
    expect(chartConfiguration).toBeTruthy();
  }));
});
