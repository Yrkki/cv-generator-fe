import { Injectable, isDevMode } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class IsSecureGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('IsSecureGuardService: environment.hosts: ', environment.hosts);
    console.log('IsSecureGuardService: location.hostname: ', location.hostname);
    console.log('IsSecureGuardService: environment.hosts.includes(location.hostname): ', environment.hosts.includes(location.hostname));
    if (!(isDevMode()) && (location.protocol !== 'https:') && !environment.hosts.includes(location.hostname)) {
      location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
      return false;
    }
    return true;
  }
}
