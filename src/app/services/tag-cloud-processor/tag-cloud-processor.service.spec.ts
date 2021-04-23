import { TestBed, inject } from '@angular/core/testing';

import { TagCloudProcessorService } from './tag-cloud-processor.service';
import { ExcelDateFormatterService } from '../excel-date-formatter/excel-date-formatter.service';

// eslint-disable-next-line max-lines-per-function
describe('TagCloudProcessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagCloudProcessorService, ExcelDateFormatterService]
    });
  });

  it('should be created', inject([TagCloudProcessorService], (service: TagCloudProcessorService) => {
    expect(service).toBeTruthy();
  }));

  it('should calculate frequencies', inject([TagCloudProcessorService], (service: TagCloudProcessorService) => {
    expect(() => {
      let readAll;
      readAll = service.calcFrequencies(undefined, 'Name');
      readAll = service.calcFrequencies(undefined, 'Name', ', ');
      readAll = service.calcFrequencies(undefined, 'Name', ', ', false);
    }).not.toThrowError();
  }));

  it('should check public interface', inject([TagCloudProcessorService], (service: TagCloudProcessorService) => {
    expect(() => {
      let readAll;
      readAll = service.getLabel('0', '10');
      readAll = service.getShortLabel('0', '10', 75);
      readAll = service.addSignificance('label', 75, 100);
      readAll = service.addMaximality('label', 75, 0, 100);

      readAll = service.replaceAll('undefined', 'test', 'test');
    }).not.toThrowError();
  }));
});
