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
import { beforeEach, describe, expect, it } from 'vitest';

import { TestBed } from '@angular/core/testing';

import { IsSecureGuardService } from './is-secure-guard.service';
import { environment } from '../../../environments/environment';

// eslint-disable-next-line max-lines-per-function
describe('IsSecureGuardService', () => {
  let service: IsSecureGuardService;
  let debugService: any;
  const routeMock: any = { snapshot: {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSecureGuardService]
    });
    service = TestBed.inject(IsSecureGuardService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // eslint-disable-next-line max-lines-per-function
  it('should check canActivate', () => {
    expect(() => {
      const environmentProduction = environment.production;
      // const locationProtocol = location.protocol;
      const environmentHosts = environment.hosts;

      [false, true].forEach((_) => {
        environment.production = _;

        //   ['http:', 'https:'].forEach(__ => {
        //     location.protocol = __;

        // Only test with localhost in hosts to avoid redirect
        // The empty array case would cause redirect in browser tests
        [['localhost']].forEach((___) => {
          environment.hosts = ___;

          const readAll = {
            canActivate: service.canActivate(routeMock)
          };
        });
        //   });
      });

      environment.production = environmentProduction;
      // location.protocol = locationProtocol;
      environment.hosts = environmentHosts;
    }).not.toThrow();
  });

  it('should check calling canActivate', () => {
    expect(() => {
      // Ensure localhost is in hosts to prevent redirect
      const originalHosts = environment.hosts;
      if (!environment.hosts.includes('localhost')) {
        environment.hosts = [...environment.hosts, 'localhost'];
      }
      try {
        service.canActivate(routeMock);
      } finally {
        environment.hosts = originalHosts;
      }
    }).not.toThrow();
  });

  it('should check calling calcCanActivate', () => {
    expect(() => {
      const l = { protocol: 'http:', href: '' } as Location;
      debugService.calcCanActivate(l);
      debugService.calcCanActivate(l, 'http:');
    }).not.toThrow();
  });

  it('should redirect when not HTTPS and host not in allowed list', () => {
    const mockLocation = {
      protocol: 'http:',
      href: 'http://example.com/path',
      hostname: 'example.com'
    } as any;

    environment.hosts = [];
    const result = debugService.calcCanActivate(mockLocation);

    expect(result).toBe(false);
    expect(mockLocation.href).toBe('https://example.com/path');
  });

  it('should not redirect when HTTPS', () => {
    const mockLocation = {
      protocol: 'https:',
      href: 'https://example.com/path',
      hostname: 'example.com'
    } as any;

    environment.hosts = [];
    const result = debugService.calcCanActivate(mockLocation);

    expect(result).toBe(true);
  });

  it('should not redirect when host is in allowed list', () => {
    const mockLocation = {
      protocol: 'http:',
      href: 'http://example.com/path',
      hostname: 'example.com'
    } as any;

    environment.hosts = ['example.com'];
    const result = debugService.calcCanActivate(mockLocation);

    expect(result).toBe(true);
  });
});
