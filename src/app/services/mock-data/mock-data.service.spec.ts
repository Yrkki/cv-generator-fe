import { TestBed, inject } from '@angular/core/testing';

import { MockDataService } from './mock-data.service';

describe('MockDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockDataService]
    });
  });

  it('should be created', inject([MockDataService], (service: MockDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should check public interface', inject([MockDataService], (service: MockDataService) => {
    expect(() => {
      let readAll;
      readAll = service.getCv();
      readAll = service.getProjects();
      readAll = service.getGanttChart();
      readAll = service.getGeneralTimeline();
      readAll = service.getEntities();
      readAll = service.getUi();
    }).not.toThrowError();
  }));
});
