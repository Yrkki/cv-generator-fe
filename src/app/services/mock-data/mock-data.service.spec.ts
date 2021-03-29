import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MockDataService } from './mock-data.service';
import { take } from 'rxjs/operators';

describe('MockDataService', () => {
  let service: MockDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockDataService,
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      service.getUi().pipe(take(1)).subscribe(_ => {
        expect(Object.keys(_).length).toBe(Object.keys(service.mockUi).length); expect(_).toEqual(service.mockUi);
      });
      service.getEntities().pipe(take(1)).subscribe(_ => { expect(Object.keys(_).length).toBeGreaterThan(0); });

      service.getCv().pipe(take(1)).subscribe(_ => { expect(Object.keys(_).length).toBeGreaterThan(0); });
      service.getProjects().pipe(take(1)).subscribe(_ => { expect(Object.keys(_).length).toBeGreaterThan(0); });

      service.getGeneralTimeline().pipe(take(1)).subscribe(_ => { expect(Object.keys(_).length).toBeGreaterThan(0); });
    }).not.toThrowError();
  });
});
