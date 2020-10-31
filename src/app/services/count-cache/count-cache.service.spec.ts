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

      service.filteredProjects = service.filteredProjects;
      service.filteredPublications = service.filteredPublications;

      let readAll;
      readAll = service.entities;

      readAll = service.filteredCertifications;
      readAll = service.filteredCourses;
      readAll = service.filteredOrganizations;

      readAll = service.getDecryptedProjectPeriod(new Project());
      readAll = service.calcCountCache();

      readAll = service.checkToggleCollapsed();
      const cacheKey = 'Certification';
      readAll = service.checkToggleCollapsed(cacheKey);
    }).not.toThrowError();
  });
});
