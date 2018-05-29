import { TestBed, inject } from '@angular/core/testing';

import { LogUpdateService } from './log-update.service';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';

describe('LogUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServiceWorkerModule.register('', {enabled: false})],
      providers: [LogUpdateService, SwUpdate]
    });
  });

  it('should be created', inject([LogUpdateService], (service: LogUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
