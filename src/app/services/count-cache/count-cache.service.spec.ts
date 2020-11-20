import { TestBed } from '@angular/core/testing';

import { CountCacheService } from './count-cache.service';
import { HttpClientModule } from '@angular/common/http';
import { Project } from '../../classes/project/project';

describe('EntitiesService', () => {
  let service: CountCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(CountCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      service.countCache = service.countCache;
      service.frequenciesCache = service.frequenciesCache;

      service.decryptedPeriod = service.decryptedPeriod;

      service.filtered.Accomplishments = service.filtered.Accomplishments;
      service.filtered.Projects = service.filtered.Projects;
      service.filtered.Publications = service.filtered.Publications;

      let readAll;
      readAll = service.entities;

      readAll = service.filtered;
      readAll = service.filtered.Certifications;
      readAll = service.filtered.Languages;
      readAll = service.filtered.Courses;
      readAll = service.filtered.Organizations;
      readAll = service.filtered.Volunteering;

      readAll = service.getDecryptedProjectPeriod(new Project());
      readAll = service.calcCountCache([]);
      readAll = service.calcCountCache(['Project']);
      readAll = service.calcCountCache(['Language']);
      readAll = service.calcCountCache(['Accomplishment']);
      readAll = service.calcCountCache(['Publication']);

      readAll = service.checkToggleCollapsed();
      const cacheKey = 'Certification';
      readAll = service.checkToggleCollapsed(cacheKey);
    }).not.toThrowError();
  });
});
