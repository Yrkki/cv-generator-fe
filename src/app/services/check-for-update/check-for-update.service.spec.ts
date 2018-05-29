import { TestBed, inject } from '@angular/core/testing';

import { CheckForUpdateService } from './check-for-update.service';
import { ServiceWorkerModule } from '@angular/service-worker';

describe('CheckForUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServiceWorkerModule.register('', {enabled: false})],
      providers: [CheckForUpdateService]
    });
  });

  it('should be created', inject([CheckForUpdateService], (service: CheckForUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
