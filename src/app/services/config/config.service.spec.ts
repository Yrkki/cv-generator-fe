import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { ConfigService } from './config.service';

// eslint-disable-next-line max-lines-per-function
describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ConfigService);
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
      let readAll;
      TestingCommon.disableLogging();
      readAll = service.fetchConfig('/config').catch();
      readAll = service.fetchConfig('/test-error').catch();
      readAll = service.fetchConfig().catch();
      TestingCommon.enableLogging();
    }).not.toThrowError();
  });
});
