import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PortfolioService } from './portfolio.service';
// import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';
import { Project } from '../../classes/project/project';

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

  it('should check generalTimelineDefined', () => {
    expect(() => {
      let readAll;
      readAll = service.generalTimelineDefined();
    }).not.toThrowError();
  });

  it('should toggle decorations', () => {
    expect(() => {
      // service.LoadData();
      const value = service.decorations;
      service.decorations = true;
      service.decorations = false;
      service.decorations = value;
    }).not.toThrowError();
  });

  it('should toggle pagination', () => {
    expect(() => {
      // service.LoadData();
      const value = service.pagination;
      service.pagination = true;
      service.pagination = false;
      service.pagination = value;
    }).not.toThrowError();
  });

  it('should toggle tagCloud', () => {
    expect(() => {
      // service.LoadData();
      const value = service.tagCloud;
      service.tagCloud = TagCloudDisplayMode.tagCloud;
      service.tagCloud = TagCloudDisplayMode.chart;
      service.tagCloud = TagCloudDisplayMode.both;
      service.tagCloud = TagCloudDisplayMode.tagCloud;
      service.tagCloud = TagCloudDisplayMode.both;
      service.tagCloud = TagCloudDisplayMode.chart;
      service.tagCloud = TagCloudDisplayMode.tagCloud;
      service.tagCloud = value;
    }).not.toThrowError();
  });

  it('should check ui', () => { expect(() => { service.ui = service.ui; }).not.toThrowError(); });
  it('should check entities', () => { expect(() => { service.entities = service.entities; }).not.toThrowError(); });
  it('should check cv', () => { expect(() => { service.cv = service.cv; }).not.toThrowError(); });
  it('should check projects', () => { expect(() => { service.projects = service.projects; }).not.toThrowError(); });

  it('should check isEmpty', () => { expect(() => { const readAll = service.isEmpty({}); }).not.toThrowError(); });
  // ...

  it('should check public interface properties', () => {
    expect(() => {
      service.countCache = service.countCache;
      service.frequenciesCache = service.frequenciesCache;

      service.filtered.Accomplishments = service.filtered.Accomplishments;
      service.filtered.Education = service.filtered.Education;
      service.filtered.ProfessionalExperience = service.filtered.ProfessionalExperience;
      service.filtered.Projects = service.filtered.Projects;
      service.filtered.Publications = service.filtered.Publications;

      let readAll;
      readAll = service.data;
      readAll = service.filtered;
      readAll = service.filtered.Certifications;
      readAll = service.filtered.Courses;
      readAll = service.filtered.Organizations;
      readAll = service.filtered.Volunteering;
      readAll = service.decryptedPeriod;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.getDecryptedProjectPeriod(new Project());

      const cacheKey = 'Certification';
      readAll = service.checkToggleCollapsed(cacheKey);
    }).not.toThrowError();
  });

  it('should check replaceAll', () => {
    expect(() => {
      let readAll;
      readAll = service.replaceAll('undefined', 'test', 'test');
    }).not.toThrowError();
  });
});
