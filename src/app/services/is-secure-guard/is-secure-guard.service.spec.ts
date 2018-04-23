import { TestBed, inject } from '@angular/core/testing';

import { IsSecureGuardService } from './is-secure-guard.service';

describe('IsSecureGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSecureGuardService]
    });
  });

  it('should be created', inject([IsSecureGuardService], (service: IsSecureGuardService) => {
    expect(service).toBeTruthy();
  }));
});
