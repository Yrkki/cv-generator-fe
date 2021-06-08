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
