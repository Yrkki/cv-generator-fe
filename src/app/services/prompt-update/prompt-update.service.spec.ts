import { TestBed, inject } from '@angular/core/testing';

import { PromptUpdateService } from './prompt-update.service';
import { ServiceWorkerModule } from '@angular/service-worker';

describe('PromptUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServiceWorkerModule.register('', {enabled: false})],
      providers: [PromptUpdateService]
    });
  });

  it('should be created', inject([PromptUpdateService], (service: PromptUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
