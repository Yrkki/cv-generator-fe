import { TestBed, inject } from '@angular/core/testing';

import { TagCloudProcessorService } from './tag-cloud-processor.service';

describe('TagCloudProcessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagCloudProcessorService]
    });
  });

  it('should be created', inject([TagCloudProcessorService], (service: TagCloudProcessorService) => {
    expect(service).toBeTruthy();
  }));
});
