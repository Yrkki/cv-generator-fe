import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * A geolocation service.
 */
@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  /** The geolocation data path. */
  public readonly geolocationUrl = 'http://api.ipstack.com/check?access_key=44ca4bb74cb7662567833c7016c92afa';

  /**
   * Constructs the geolocation service.
   * ~constructor
   *
   * @param httpClient The http client for requests to the server.
   */
  constructor(
    protected httpClient: HttpClient) {
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
