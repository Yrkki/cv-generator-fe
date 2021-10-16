// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { ILogger } from '../../interfaces/logger/logger';
import { Logger } from './logger';

/**
 * Test logger class.
 * ~extends {@link Logger}
 */
export class TestLogger extends Logger {
  /** Messages */
  public static readonly messages: any[] = [
    void 0,
    'message',
    'qualifier1: message',
    'qualifier1: qualifier2: message',
    'qualifier1: qualifier2: qualifier3: message',
  ];

  /** Optional paramseters array */
  public static readonly optionalParamsArray: any[][] = [
    [void 0],
    ['optionalParam1'],
    ['optionalParam1', 'optionalParam2'],
    ['optionalParam1', 'optionalParam2', 'optionalParam3'],
  ];

  /** Test */
  public static test(logger: ILogger = new Logger()) {
    let readAll;
    logger.mechanism = new Logger();
    this.messages.forEach((message) => {
      this.optionalParamsArray.forEach((optionalParams) => {
        readAll = logger.log(message, optionalParams);
        readAll = logger.info(message, optionalParams);
        readAll = logger.debug(message, optionalParams);
        readAll = logger.warn(message, optionalParams);
        readAll = logger.error(message, optionalParams);
      });
    });
    logger.mechanism = console;
  }
}

describe('TestLogger', () => {
  it('should test public interface', () => {
    expect(() => {
      // let readAll;
      TestLogger.test(new TestLogger());
    }).not.toThrowError();
  });
});
