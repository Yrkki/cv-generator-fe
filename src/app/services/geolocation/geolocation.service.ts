// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GeolocationProvider } from '../../enums/geolocation-provider.enum';

import { PersistenceService } from '../persistence/persistence.service';

import { Indexable } from '../../interfaces/indexable';

import GeolocationDefaultJSON from './geolocation.default.json';

/**
 * A geolocation service.
 */
@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  /** Default geolocation. */
  public readonly defaultGeolocation = GeolocationDefaultJSON;

  /** The known geolocation data paths. */
  public readonly geolocationUrls = new Map<number, string>([
    [GeolocationProvider.geolocation, '/geolocation'],
    [GeolocationProvider.ipapi, 'https://ipapi.co/json'],
    [GeolocationProvider.ipgeolocation, 'https://api.ipgeolocation.io/ipgeo?apiKey=d0650adcae4143cfb48580bf521ffdd0'],
    [GeolocationProvider.ipstack, 'http://api.ipstack.com/check?access_key=44ca4bb74cb7662567833c7016c92afa']
  ]);

  /** Default geolocation provider. */
  public readonly geolocationProviderDefault = GeolocationProvider.geolocation;

  /** Service geolocation provider getter. */
  public get geolocationProvider(): GeolocationProvider {
    const geolocationProviderString = this.persistenceService.getItem('geolocationProvider')
      ?? GeolocationProvider[this.geolocationProviderDefault];

    return (GeolocationProvider as Indexable)[geolocationProviderString];
  }
  /** Service geolocation provider setter. */
  public set geolocationProvider(value: GeolocationProvider) {
    this.persistenceService.setItem('geolocationProvider', GeolocationProvider[value]);
  }

  /** The geolocation data path getter. */
  public get geolocationUrl() {
    let geolocationUrl = this.geolocationUrls.get(this.geolocationProvider);
    if (!geolocationUrl) { geolocationUrl = this.geolocationUrls.get(this.geolocationProviderDefault); }
    if (!geolocationUrl) { geolocationUrl = (this.geolocationUrls.values() as Indexable)[0]; }

    // tslint:disable-next-line: no-non-null-assertion
    return geolocationUrl!;
  }

  /**
   * Constructs the geolocation service.
   * ~constructor
   *
   * @param persistenceService The persistence service injected dependency.
   * @param httpClient The http client for requests to the server.
   */
  constructor(
    protected persistenceService: PersistenceService,
    protected httpClient: HttpClient
  ) {
    this.geolocationProvider = this.geolocationProvider;
  }

  /**
   * Retrieves a geolocation.
   *
   * @returns The geolocation.
   */
  getGeolocation(): Observable<any> {
    const geolocation$ = this.httpClient.get<any>(this.geolocationUrl);
    return geolocation$;
  }
}
