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

  it('should check public interface', inject([ExcelDateFormatterService], (service: ExcelDateFormatterService) => {
    expect(() => {
      let readAll;
      readAll = service.formatDate(12345);
      readAll = service.getJsDateValueFromExcel(23456);
      readAll = service.getJsDateValueFromExcel('23456');
      readAll = service.formatDates(['From', 'To'], 'From', 45678);
    }).not.toThrowError();
  }));
});
