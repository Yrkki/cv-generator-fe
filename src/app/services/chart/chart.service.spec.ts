import { TestBed, inject } from '@angular/core/testing';

import { ChartService } from './chart.service';

// eslint-disable-next-line max-lines-per-function
describe('ChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartService]
    });
  });

  it('should be created', inject([ChartService], (service: ChartService) => {
    expect(service).toBeTruthy();
  }));

  [true, false, undefined].forEach((_) => {
    it('should calculate a language chart: ' + _, inject([ChartService], (service: ChartService) => {
      const chartConfiguration = service.addLanguageChart([
        {
          Language: 'English',
          Level: 'Full professional proficiency',
          Score: 4,
          Share: 30
        }], _);
      expect(chartConfiguration).toBeTruthy();
    }));
  });

  [true, false, undefined].forEach((_) => {
    it('should calculate a chart: ' + _, inject([ChartService], (service: ChartService) => {
      const chartConfiguration = service.addChart([
        [
          'Developer',
          {
            Count: 16,
            Percentage: 48,
            Lightness: 0
          }
        ],
        [
          'Programmer',
          {
            Count: 5,
            Percentage: 15,
            Lightness: 37
          }]
      ], _);
      expect(chartConfiguration).toBeTruthy();
    }));
  });

  it('should initialize colors', inject([ChartService], (service: ChartService) => {
    service.initColors();

    expect(service).toBeTruthy();
  }));

  const drawChart = (chartType: string, service: ChartService) => {
    ChartService.testing = true;
    service.drawChart(chartType, {});
  };

  it('should draw chart', inject([ChartService], (service: ChartService) => {
    expect(() => {
      ['Language', 'Project Gantt', 'Project Gantt Map'].forEach((chartType) => {
        drawChart(chartType, service);
      });
    }).not.toThrowError();
  }));

  it('should draw Language chart', inject([ChartService], (service: ChartService) => {
    expect(() => {
      const chartType = 'Language';
      drawChart(chartType, service);
    }).not.toThrowError();
  }));

  it('should draw Project Gantt chart', inject([ChartService], (service: ChartService) => {
    expect(() => {
      const chartType = 'Project Gantt';
      drawChart(chartType, service);
    }).not.toThrowError();
  }));

  it('should draw Project Gantt Map chart', inject([ChartService], (service: ChartService) => {
    expect(() => {
      const chartType = 'Project Gantt Map';
      drawChart(chartType, service);
    }).not.toThrowError();
  }));

  it('should check public interface properties', inject([ChartService], (service: ChartService) => {
    expect(() => {
      service.chartModel.chartLoaded = service.chartModel.chartLoaded;
      ChartService.testing = ChartService.testing;
    }).not.toThrowError();
  }));

  it('should check public interface methods', inject([ChartService], (service: ChartService) => {
    expect(() => {
      const readAll = service.chartName('key');

      service.refreshCharts();
    }).not.toThrowError();
  }));
});
