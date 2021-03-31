/**
 * Logger interface.
 */
export interface ILogger {
  /** Mechanism */
  mechanism?: ILogger;

  /** Log */
  log(message?: any, ...optionalParams: any[]): void;

  /** Info */
  info(message?: any, ...optionalParams: any[]): void;

  /** Debug */
  debug(message?: any, ...optionalParams: any[]): void;

  /** Warn */
  warn(message?: any, ...optionalParams: any[]): void;

  /** Error */
  error(message?: any, ...optionalParams: any[]): void;
}
