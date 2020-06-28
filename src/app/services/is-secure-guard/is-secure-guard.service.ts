import { Injectable, isDevMode } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';

/**
 * A TLS/SSL protocol route guard.
 * @implements {@link CanActivate}
 *
 * @description
 * A guard deciding if a route can be activated.
 */
@Injectable()
export class IsSecureGuardService implements CanActivate {

  /**
   * Implementation of the CanActivate interface.
   * @override
   * @param route The activated route snapshot.
   *
   * @returns Whether the route can be activated.
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // console.log('IsSecureGuardService: environment.hosts: ', environment.hosts);
    // console.log('IsSecureGuardService: location.hostname: ', location.hostname);
    // console.log('IsSecureGuardService: environment.hosts.includes(location.hostname): ', environment.hosts.includes(location.hostname));
    const https = 'https:';
    if (!(isDevMode()) && (location.protocol !== https) && !environment.hosts.includes(location.hostname)) {
      location.href = https + globalThis.location.href.substring(globalThis.location.protocol.length);
      return false;
    }
    return true;
  }
}
