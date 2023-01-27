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
import { Component, AfterViewInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { SanitizerService } from '../../services/sanitizer/sanitizer.service';
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
  private geolocation: any = this.geolocationService.defaultGeolocation;
  /** Geolocation getter. */
  public get Geolocation() { return this.geolocation; }
  /** Geolocation setter. */
  public set Geolocation(value) { this.geolocation = value; }

  /** Geolocation if is in EU getter. */
  public get GeolocationIsEu() { return this.geolocation.is_eu ?? this.geolocation.location?.is_eu; }

  /** Geolocation EU flag getter. */
  public get GeolocationFlagEu() { return 'assets/images/european-union.png'; }

  /** Geolocation EU flag emoji getter. */
  public get GeolocationFlagEuEmoji() { return '\uD83C\uDDEA\uD83C\uDDFA'; }

  /** Geolocation flag. */
  #geolocationFlag = this.sanitizerService.sanitizeSecurityTrustUrl('');
  /** Geolocation flag getter. */
  public get GeolocationFlag() { return this.#geolocationFlag; }

  /** Geolocation flag emoji getter. */
  public get GeolocationFlagEmoji() { return this.geolocation.location?.country_flag_emoji; }

  /** Geolocation getter. */
  public get Location() {
    return [this.GeolocationCity, this.GeolocationStateProv, this.GeolocationCountry]
      .filter((_) => _.length > 0).join(', ');
  }

  /** Geolocation country getter. */
  public get GeolocationCountry() { return this.geolocation.country_name ?? this.geolocation.location?.country_name; }

  /** Geolocation state_prov getter. */
  public get GeolocationStateProv() { return this.geolocation.state_prov; }

  /** Geolocation city getter. */
  public get GeolocationCity() { return this.geolocation.city; }

  /** Geolocation IP getter. */
  public get GeolocationIP() { return this.geolocation.ip; }

  /** Geolocation IP type getter. */
  public get GeolocationIpType() { return this.geolocation.type; }

  /** Geolocation url getter. */
  public get GeolocationUrl() { return this.geolocationService.geolocationUrl; }

  /** Space placeholder. */
  public get space() { return this.uiService.nonBreakingSpace; }

  /** Divider delegate. */
  public get divider() { return this.uiService.frequenciesDivider; }

  /** Show divider feature toggle. */
  private showDivider = true;
  /** Show divider feature toggle getter. */
  public get ShowDivider() { return this.showDivider; }
  /** Show divider feature toggle setter. */
  public set ShowDivider(value) { this.showDivider = value; }

  /**
   * Constructs the Geolocation component.
   *
   * @param uiService The ui service injected dependency.
   * @param sanitizerService The DOM sanitizer service injected dependency.
   * @param geolocationService The geolocation service injected dependency.
   */
  constructor(
    public uiService: UiService,
    private sanitizerService: SanitizerService,
    private geolocationService: GeolocationService
  ) { }

  /** Initialization */
  ngAfterViewInit(): void {
    setTimeout(() => this.getGeolocation());
  }

  /** Loads the geolocation. */
  private getGeolocation(): void {
    this.geolocationService.getGeolocation()
      .pipe(take(1))
      .subscribe((geolocation) => {
        this.onGetGeolocation(geolocation);
      });
  }

  /** Geolocation handler. */
  private onGetGeolocation(geolocation: any): void {
    this.Geolocation = geolocation;
    this.#geolocationFlag = this.sanitizerService.sanitizeSecurityTrustUrl(
      this.geolocation.country_flag ?? this.geolocation.location?.country_flag);
  }
}
