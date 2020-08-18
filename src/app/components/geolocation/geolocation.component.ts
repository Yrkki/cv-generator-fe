import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

import { UiService } from '../../services/ui/ui.service';
import { GeolocationService } from '../../services/geolocation/geolocation.service';

/**
 * Geolocation component.
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements AfterViewInit {
  /** Geolocation storage. */
  private geolocation: any = {};
  /** Geolocation getter. */
  public get Geolocation() { return this.geolocation; }
  /** Geolocation setter. */
  public set Geolocation(value) { this.geolocation = value; }

  /** Geolocation if is in EU getter. */
  public get GeolocationIsEu() { return this.geolocation.is_eu ?? this.geolocation.location?.is_eu; }

  /** Geolocation flag getter. */
  public get GeolocationFlag() {
    return this.sanitizer.bypassSecurityTrustUrl(this.geolocation.country_flag ?? this.geolocation.location?.country_flag);
  }

  /** Geolocation flag getter. */
  public get GeolocationFlagEmoji() { return this.geolocation.location?.country_flag_emoji; }

  /** Geolocation city getter. */
  public get GeolocationCity() { return this.geolocation.city; }

  /** Geolocation IP getter. */
  public get GeolocationIP() { return this.geolocation.ip; }

  /** Geolocation IP type getter. */
  public get GeolocationIpType() { return this.geolocation.type; }

  /** Geolocation url getter. */
  public get GeolocationUrl() { return this.geolocationService.geolocationUrl; }

  /**
   * Constructs the Geolocation component.
   * @param uiService The ui service injected dependency.
   * @param sanitizer The DOM sanitizer injected dependency.
   * @param geolocationService The geolocation service injected dependency.
   */
  constructor(
    public uiService: UiService,
    private sanitizer: DomSanitizer,
    private geolocationService: GeolocationService
  ) { }

  /** Initialization */
  ngAfterViewInit(): void {
    this.getGeolocation();
  }

  /** Loads the geolocation. */
  private getGeolocation(): void {
    this.geolocationService.getGeolocation().pipe(take(1)).subscribe((geolocation) => {
      this.Geolocation = geolocation;
    });
  }
}
