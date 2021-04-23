import { TestBed } from '@angular/core/testing';

import { PortfolioService } from './portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';
import { Project } from '../../classes/project/project';

// eslint-disable-next-line max-lines-per-function
describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        PortfolioService,
      ]
    });
    service = TestBed.inject(PortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check generalTimelineDefined', () => {
    expect(() => {
      let readAll;
      readAll = service.generalTimelineDefined();
    }).not.toThrowError();
  });

  it('should check ui', () => { expect(() => { const readAll = service.model.portfolioModel.ui; }).not.toThrowError(); });
  it('should check entities', () => { expect(() => { const readAll = service.model.portfolioModel.entities; }).not.toThrowError(); });
  it('should check cv', () => { expect(() => { const readAll = service.model.portfolioModel.cv; }).not.toThrowError(); });
  it('should check projects', () => { expect(() => { const readAll = service.model.portfolioModel.projects; }).not.toThrowError(); });

  it('should check isEmpty', () => { expect(() => { const readAll = service.isEmpty({}); }).not.toThrowError(); });

  it('should check public interface properties', () => {
    expect(() => {
      service.model.entitiesModel.countCache = service.model.entitiesModel.countCache;

      service.model.portfolioModel.filtered.Accomplishments = service.model.portfolioModel.filtered.Accomplishments;
      service.model.portfolioModel.filtered.Education = service.model.portfolioModel.filtered.Education;
      service.model.portfolioModel.filtered.ProfessionalExperience = service.model.portfolioModel.filtered.ProfessionalExperience;
      service.model.portfolioModel.filtered.Projects = service.model.portfolioModel.filtered.Projects;
      service.model.portfolioModel.filtered.Publications = service.model.portfolioModel.filtered.Publications;

      let readAll;
      readAll = service.model.portfolioModel.filtered;
      readAll = service.model.portfolioModel.filtered.Certifications;
      readAll = service.model.portfolioModel.filtered.Courses;
      readAll = service.model.portfolioModel.filtered.Organizations;
      readAll = service.model.portfolioModel.filtered.Volunteering;
      readAll = service.model.portfolioModel.filtered.Vacation;
      readAll = service.decryptedPeriod;

      readAll = service.toolbarService;
      readAll = service.persistenceService;
      readAll = service.model;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.getDecryptedProjectPeriod(new Project());

      const cacheKey = 'Certification';
      readAll = service.checkToggleCollapsed(cacheKey);

      const entityType = service.model.portfolioModel.entities.Projects?.key || 'Projects';
    }).not.toThrowError();
  });
});
