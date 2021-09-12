// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { logger } from './logger.service';
import { TestLogger } from '../../classes/logger/test-logger.spec';

describe('Logger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
  });

  it('should check public interface properties', () => {
    expect(() => {
      const readAll = logger;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      // let readAll;
      TestLogger.test(logger);
    }).not.toThrowError();
  });
});
