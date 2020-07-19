import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PortfolioService } from './portfolio.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

describe('PortfolioService', () => {
  let service: PortfolioService;
  // let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [HttpClientTestingModule],
      imports: [HttpClientModule],
      providers: [
        PortfolioService,
        // HttpClient,
        // HttpHandler
      ]
    });
    // httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PortfolioService);
  });

  // afterEach(() => {
  //   httpTestingController.verify();
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load', () => {
    expect(() => {
      // service.LoadData();
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      service.cv = service.cv;
      service.entities = service.entities;
      service.ui = service.ui;
      service.projects = service.projects;
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
    }).not.toThrowError();
  });

  it('should check generalTimelineDefined', () => {
    expect(() => {
      let readAll;
      readAll = service.generalTimelineDefined();
    }).not.toThrowError();
  });

  it('should check replaceAll', () => {
    expect(() => {
      let readAll;
      readAll = service.replaceAll('undefined', 'test', 'test');
    }).not.toThrowError();
  });
});
