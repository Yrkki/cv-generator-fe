// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
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
