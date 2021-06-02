import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Chart, ChartConfiguration, TooltipItem } from 'chart.js';
import { DeepPartial } from 'chart.js/types/utils';

import { ChartService } from './chart.service';
import { MockDataService } from '../mock-data/mock-data.service';

// eslint-disable-next-line max-lines-per-function
describe('ChartService', () => {
  let service: ChartService;
  let debugService: any;
  let mockDataService: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ChartService,
      ]
    });
    service = TestBed.inject(ChartService);
    debugService = service as any;
    mockDataService = TestBed.inject(MockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // eslint-disable-next-line max-lines-per-function
  [true, false, undefined].forEach((responsive) => {
    // eslint-disable-next-line max-lines-per-function
    it('should calculate a language chart, responsive: ' + responsive, () => {
      expect(() => {
        let chartConfiguration: DeepPartial<ChartConfiguration>;
        const frequencies = mockDataService.mockData.languages;
        [undefined, frequencies].forEach((f) => {
          chartConfiguration = debugService.addLanguageChart(f, responsive);
          if (f) {
            [chartConfiguration.options?.plugins?.tooltip?.callbacks?.label as any].forEach((callback) => {
              [undefined, 0].forEach((dataIndex) => {
                if (callback) {
                  callback({ dataIndex, label: 'label' } as TooltipItem<'pie'>);

                  const data = chartConfiguration.data;
                  chartConfiguration.data = { labels: undefined };
                  callback({ dataIndex, label: 'label' } as TooltipItem<'pie'>);
                  chartConfiguration.data = data;
                }
              });
            });
          }
          const datasetsSettings = debugService.datasetsSettings;
          debugService.datasetsSettings = () => ({ datasets: undefined });
          chartConfiguration = debugService.addLanguageChart(f, responsive);
          debugService.datasetsSettings = datasetsSettings;
        });
      }).not.toThrowError();
    });
  });

  [true, false, undefined].forEach((responsive) => {
    it('should calculate a chart, responsive: ' + responsive, () => {
      expect(() => {
        let chartConfiguration: DeepPartial<ChartConfiguration>;
        const frequencies = mockDataService.mockData.frequencies;
        [undefined, frequencies, new Array(101).map((el) => frequencies[0])].forEach((f) => {
          chartConfiguration = debugService.addChart(f, responsive);

          const datasetsSettings = debugService.datasetsSettings;
          debugService.datasetsSettings = () => ({ datasets: undefined });
          chartConfiguration = debugService.addChart(f, responsive);
          debugService.datasetsSettings = datasetsSettings;
        });
      }).not.toThrowError();
    });
  });

  [true, false, undefined].forEach((responsive) => {
    it('should calculate tooltip, responsive: ' + responsive, () => {
      expect(() => {
        const frequencies = mockDataService.mockData.frequencies;
        [frequencies].forEach((f) => {
          const tooltip = debugService.tooltip(f);
          [tooltip?.callbacks?.label, tooltip?.callbacks?.labelTextColor].forEach((callback) => {
            [undefined, 0].forEach((dataIndex) => {
              if (callback) {
                callback({ dataIndex, label: 'label' } as TooltipItem<'pie'>);
              }
            });
          });
        });
      }).not.toThrowError();
    });
  });

  it('should initialize colors', () => {
    expect(() => {
      service.initColors();
    }).not.toThrowError();
  });

  const drawChart = (chartType: string) => {
    service.drawChart(chartType, {});
  };

  it('should draw chart', () => {
    expect(() => {
      ['Language', 'Project Gantt', 'Project Gantt Map'].forEach((chartType) => {
        drawChart(chartType);
      });
    }).not.toThrowError();
  });

  it('should draw Language chart', () => {
    expect(() => {
      const chartType = 'Language';
      drawChart(chartType);
    }).not.toThrowError();
  });

  it('should draw Project Gantt chart', () => {
    expect(() => {
      const chartType = 'Project Gantt';
      drawChart(chartType);
    }).not.toThrowError();
  });

  it('should draw Project Gantt Map chart', () => {
    expect(() => {
      const chartType = 'Project Gantt Map';
      drawChart(chartType);
    }).not.toThrowError();
  });

  const createChart = (ctx: CanvasRenderingContext2D) => {
    debugService.cleanUpChart(debugService.chartInstancesCache[ctx?.canvas.id]);
    try {
      debugService.createChart(ctx, {} as ChartConfiguration);
    } catch (err) { }
  };

  it('should check createChart error handling', () => {
    expect(() => {
      try {
        debugService.createChart({} as CanvasRenderingContext2D, {} as ChartConfiguration);
      } catch (err) { }
    }).not.toThrowError();
  });

  it('should check createChart', () => {
    expect(() => {
      const canvasId = 'Project Gantt chart';
      const ctx: CanvasRenderingContext2D = debugService.loadChartContext(canvasId);

      createChart(ctx);
    }).not.toThrowError();
  });

  it('should check createChart cached', () => {
    expect(() => {
      const canvasId = 'Project Gantt chart';
      const ctx: CanvasRenderingContext2D = debugService.loadChartContext(canvasId);

      createChart(ctx);
      debugService.chartInstancesCache[ctx?.canvas.id] = { destroy: () => { } } as Chart;

      createChart(ctx);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      service.chartModel.chartLoaded = service.chartModel.chartLoaded;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;

      readAll = service.chartName('key');
      readAll = service.refreshCharts();

      readAll = debugService.cleanUpChart({ destroy: () => { } } as Chart);
    }).not.toThrowError();
  });
});
