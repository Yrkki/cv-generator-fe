import { TestBed } from '@angular/core/testing';

import { PortfolioService } from './portfolio.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(PortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      service.cv = service.cv;
      service.entities = service.entities;
      service.ui = service.ui;
      service.chartLoaded = service.chartLoaded;
      service.countCache = service.countCache;
      service.filteredProfessionalExperience = service.filteredProfessionalExperience;
      service.filteredEducation = service.filteredEducation;
      service.filteredCertifications = service.filteredCertifications;
      service.filteredAccomplishments = service.filteredAccomplishments;
      service.filteredPublications = service.filteredPublications;
      service.filteredProjects = service.filteredProjects;
      service.countCache = service.countCache;
      service.countCache = service.countCache;
      readAll = service.generalTimelineDefined();
    }).not.toThrowError();
  });
});
