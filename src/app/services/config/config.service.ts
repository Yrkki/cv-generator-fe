import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
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
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        } else {
          logger.debug(`ConfigService: fetchConfig: No config fetched.`);
          return response;
        }
      })
      .then((config) => {
        for (const key in config) {
          if (Object.prototype.hasOwnProperty.call(config, key)) {
            const value = config[key];
            (environment as typeof config)[key] = value;
            logger.debug(`ConfigService: fetchConfig: Transferred config key: ${key}: ${value}`);
          }
        }
      })
      .catch((err) => {
        logger.error(err);
        logger.debug(`ConfigService: fetchConfig: No config transferred. Using defaults...`);
      });
  }
}
