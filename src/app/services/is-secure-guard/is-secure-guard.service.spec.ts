import { TestBed, inject } from '@angular/core/testing';

import { IsSecureGuardService } from './is-secure-guard.service';
import { environment } from '../../../environments/environment.heroku';

describe('IsSecureGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSecureGuardService]
    });
  });

  it('should be created', inject([IsSecureGuardService], (service: IsSecureGuardService) => {
    expect(service).toBeTruthy();
  }));

  it('should check canActivate', inject([IsSecureGuardService], (service: IsSecureGuardService) => {
    expect(() => {
      const environmentProduction = environment.production;
      // const locationProtocol = location.protocol;
      const environmentHosts = environment.hosts;

      [false, true].forEach(_ => {
        environment.production = _;

        //   ['http:', 'https:'].forEach(__ => {
        //     location.protocol = __;

        [[], [location.hostname]].forEach(___ => {
          environment.hosts = ___;

          const readAll = {
            'canActivate': service.canActivate(undefined)
          };
        });
        //   });
      });

      environment.production = environmentProduction;
      // location.protocol = locationProtocol;
      environment.hosts = environmentHosts;
    }).not.toThrowError();
  }));
});
