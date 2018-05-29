import { TestBed, inject } from '@angular/core/testing';

import { TagCloudProcessorService } from './tag-cloud-processor.service';
import { ExcelDateFormatterService } from '../excel-date-formatter/excel-date-formatter.service';

describe('TagCloudProcessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagCloudProcessorService, ExcelDateFormatterService]
    });
  });

  it('should be created', inject([TagCloudProcessorService], (service: TagCloudProcessorService) => {
    expect(service).toBeTruthy();
  }));
});
