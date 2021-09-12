// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { errorHandler, ErrorHandlerService } from './error-handler.service';

// eslint-disable-next-line max-lines-per-function
describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ErrorHandlerService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = errorHandler;
      readAll = ErrorHandlerService.instance;
      readAll = ErrorHandlerService.instance;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.globalErrorHandler({});
      readAll = service.globalErrorHandler({}, true);

      readAll = service.loggerErrorHandler({});

      readAll = service.silentErrorHandler();
      readAll = service.silentErrorHandler({});
    }).not.toThrowError();
  });
});
