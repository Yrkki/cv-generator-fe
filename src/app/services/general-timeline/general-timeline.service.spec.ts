import { TestBed, inject } from '@angular/core/testing';

import { GeneralTimelineService } from './general-timeline.service';

describe('GeneralTimelineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralTimelineService]
    });
  });

  it('should be created', inject([GeneralTimelineService], (service: GeneralTimelineService) => {
    expect(service).toBeTruthy();
  }));
});
