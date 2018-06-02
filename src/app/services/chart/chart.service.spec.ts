import { TestBed, inject } from '@angular/core/testing';

import { ChartService } from './chart.service';

describe('ChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartService]
    });
  });

  it('should be created', inject([ChartService], (service: ChartService) => {
    expect(service).toBeTruthy();
  }));

  it('should calculate a chart', inject([ChartService], (service: ChartService) => {
    const chartConfiguration = service.addLanguageChart([
      {
        'Language': 'English',
        'Level': 'Full professional proficiency',
        'Score': 4,
        'Share': 30
      }]);
    expect(chartConfiguration).toBeTruthy();
  }));

  it('should calculate a chart', inject([ChartService], (service: ChartService) => {
    const chartConfiguration = service.addChart([
      [
        'Developer',
        {
          'Count': 16,
          'Percentage': 48,
          'Lightness': 0
        }
      ],
      [
        'Programmer',
        {
          'Count': 5,
          'Percentage': 15,
          'Lightness': 37
        }
      ]
    ]);
    expect(chartConfiguration).toBeTruthy();
  }));

  it('should initialize colors', inject([ChartService], (service: ChartService) => {
    service.initColors();
    expect(service).toBeTruthy();
  }));
});
