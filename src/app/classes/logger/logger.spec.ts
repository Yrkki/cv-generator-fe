// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestLogger } from './test-logger.spec';

describe('Logger', () => {
  it('should test public interface', () => {
    expect(() => {
      // let readAll;
      TestLogger.test(new TestLogger());
    }).not.toThrowError();
  });
});
