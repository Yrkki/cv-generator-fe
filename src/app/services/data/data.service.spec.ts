import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should serve data', inject([DataService], (service: DataService) => {
    service.getUi();
    service.getEntities();

    service.getCv();
    service.getProjects();

    service.getGeneralTimeline();

    expect(service).toBeTruthy();
  }));
});
