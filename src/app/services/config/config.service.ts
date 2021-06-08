import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { errorHandler } from '../error-handler/error-handler.service';
import { logger } from '../../services/logger/logger.service';

/**
 * Config service.
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  /** Config endpoint */
  private readonly configEndpoint = '/config';

  /** Fetch config */
  public fetchConfig(configEndpoint = this.configEndpoint) {
    return fetch(configEndpoint)
      .then(this.onResponse)
      .then(this.onConfig)
      .catch(this.onError);
  }

  /** Response handler */
  private onResponse(response: Response) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      return response.json();
    } else {
      logger.debug(`ConfigService: fetchConfig: No config fetched.`);
      return response;
    }
  }

  /** Config handler */
  private onConfig(config: any) {
    for (const key in config) {
      if (Object.prototype.hasOwnProperty.call(config, key)) {
        const value = config[key];
        (environment as typeof config)[key] = value;
        logger.debug(`ConfigService: fetchConfig: Transferred config key: ${key}: ${value}`);
      }
    }
  }

  /** Error handler */
  private onError(reason: any) {
    errorHandler.loggerErrorHandler(reason);
    logger.debug(`ConfigService: fetchConfig: No config transferred. Using defaults...`);
  }
}
