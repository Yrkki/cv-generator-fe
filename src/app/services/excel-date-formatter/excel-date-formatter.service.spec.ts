/* eslint-disable max-len */
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ExcelDateFormatterService } from './excel-date-formatter.service';

// eslint-disable-next-line max-lines-per-function
describe('ExcelDateFormatterService', () => {
  let service: ExcelDateFormatterService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ExcelDateFormatterService,
      ]
    });
    service = TestBed.inject(ExcelDateFormatterService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = service.formatDate(12345);
      readAll = service.getJsDateValueFromExcel(23456);
      readAll = service.getJsDateValueFromExcel('23456');
      readAll = service.formatDates(['From', 'To'], 'From', 45678);
    }).not.toThrowError();
  });
});
