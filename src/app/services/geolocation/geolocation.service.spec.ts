import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  let service: GeolocationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GeolocationService,
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      service.getGeolocation().pipe(take(1)).subscribe(_ => { expect(Object.keys(_).length).toBeGreaterThan(0); });

      service.geolocationProvider = service.geolocationProvider;

      let readAll;
      readAll = service.geolocationUrl;
      readAll = service.geolocationUrls;
      readAll = service.geolocationProviderDefault;
    }).not.toThrowError();
  });
});
