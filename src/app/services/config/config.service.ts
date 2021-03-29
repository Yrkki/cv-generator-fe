import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Config service.
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  /** Config endpoint */
  private readonly configEndpoint = '/config';

  /** Logger */
  private readonly logger = console;

  /** Fetch config */
  public fetchConfig(configEndpoint = this.configEndpoint) {
    return fetch(configEndpoint)
      .then(response => response.json())
      .then(config => {
        for (const key in config) {
          if (Object.prototype.hasOwnProperty.call(config, key)) {
            (environment as typeof config)[key] = config[key];
            this.logger.debug(`ConfigService: fetchConfig: Transferred config key: ${key}: ${(environment as typeof config)[key]}`);
          }
        }
      })
      .catch(err => {
        this.logger.error(err);
        this.logger.debug(`ConfigService: fetchConfig: No config transferred. Using defaults...`);
      });
  }
}
