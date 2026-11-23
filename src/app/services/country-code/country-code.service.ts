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
import { Injectable } from '@angular/core';
import countryRegex from 'country-regex';

/**
 * A country code service.
 * Converts country names to ISO 3166-1 alpha-3 codes, with the same name patterns that Plotly used for its
 * former 'country names' location mode.
 */
@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {
  /** The compiled country name patterns, keyed by ISO 3166-1 alpha-3 code. */
  private readonly countryPatterns = Object.entries(countryRegex)
    .map(([iso3, source]) => [iso3, new RegExp(source)] as const);

  /**
   * Converts a country name to its ISO 3166-1 alpha-3 code.
   *
   * @param countryName The country name, optionally prefixed with its flag emoji, for example '🇬🇧 UK'.
   *
   * @returns The ISO 3166-1 alpha-3 code, for example 'GBR', or undefined if the name is not recognized.
   */
  public iso3(countryName: string): string | undefined {
    // the flag prefix would defeat anchored patterns such as the one for 'UK'
    const name = countryName.replace(/^[\p{Regional_Indicator}\s]+/u, '').trim().toLowerCase();
    return this.countryPatterns.find(([, pattern]) => pattern.test(name))?.[0];
  }
}
