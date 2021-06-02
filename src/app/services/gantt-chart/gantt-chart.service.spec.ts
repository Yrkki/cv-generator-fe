import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GanttChartService } from './gantt-chart.service';
import { TooltipItem } from 'chart.js';
import { MockDataService } from '../mock-data/mock-data.service';

// eslint-disable-next-line max-lines-per-function
describe('GanttChartService', () => {
  let service: GanttChartService;
  let debugService: any;
  let mockDataService: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        GanttChartService,
      ]
    });
    service = TestBed.inject(GanttChartService);
    debugService = service as any;
    mockDataService = TestBed.inject(MockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate a chart', () => {
    expect(() => {
      const projects = mockDataService.mockData.projects;
      [undefined, projects].forEach((p) => {
        const chartConfiguration = service.addChart.apply(
          service,
          [mockDataService.mockData.projects, mockDataService.mockData.filteredProjects]
        );
        if (p) {
          [
            chartConfiguration.options?.plugins?.tooltip?.callbacks?.title as any,
            chartConfiguration.options?.plugins?.tooltip?.callbacks?.label as any
          ].forEach((callback) => {
            [undefined, 0].forEach((dataIndex) => {
              if (callback) {
                callback({ dataIndex, label: 'label' } as TooltipItem<'bar'>);
              }
            });
          });
        }
      });
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      const readAll = debugService.ticks(0, 0, []);
    }).not.toThrowError();
  });
});
