import { TestBed, inject } from '@angular/core/testing';

import { ExcelDateFormatterService } from './excel-date-formatter.service';

describe('ExcelDateFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelDateFormatterService]
    });
  });

  it('should be created', inject([ExcelDateFormatterService], (service: ExcelDateFormatterService) => {
    expect(service).toBeTruthy();
  }));
});
