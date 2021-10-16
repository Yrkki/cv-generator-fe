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
import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GeolocationService } from './geolocation.service';
import { GeolocationProvider } from '../../enums/geolocation-provider.enum';

// eslint-disable-next-line max-lines-per-function
describe('GeolocationService', () => {
  let service: GeolocationService;
  let debugService: any;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GeolocationService,
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GeolocationService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      service.getGeolocation().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });

      service.geolocationProvider = service.geolocationProvider;

      let readAll;
      readAll = service.defaultGeolocation;

      readAll = service.geolocationUrl;
      service.geolocationProvider = -1 as GeolocationProvider;
      readAll = service.geolocationUrl;
      debugService.geolocationProviderDefault = -1 as GeolocationProvider;
      readAll = service.geolocationUrl;

      readAll = service.geolocationUrls;
      readAll = service.geolocationProviderDefault;
    }).not.toThrowError();
  });
});
