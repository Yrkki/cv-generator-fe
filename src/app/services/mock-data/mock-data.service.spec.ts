import { TestBed } from '@angular/core/testing';

import { MockDataService } from './mock-data.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

describe('MockDataService', () => {
  let service: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, MockDataService]
    });
    const httpClient = TestBed.inject(HttpClient);
    service = new MockDataService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = service.getCv();
      readAll = service.getProjects();
      readAll = service.getGanttChart();
      readAll = service.getGeneralTimeline();
      readAll = service.getEntities();
      readAll = service.getUi();
    }).not.toThrowError();
  });
});
