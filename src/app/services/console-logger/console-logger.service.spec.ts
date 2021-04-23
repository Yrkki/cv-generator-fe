import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TestLogger } from '../../classes/logger/test-logger.spec';

import { ConsoleLoggerService } from './console-logger.service';

// eslint-disable-next-line max-lines-per-function
describe('ConsoleLoggerService', () => {
  let service: ConsoleLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ConsoleLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      // let readAll;
      TestLogger.test(service);
      service.doLog(service.mechanism.log, 'message', 'yellow');
    }).not.toThrowError();
  });
});
