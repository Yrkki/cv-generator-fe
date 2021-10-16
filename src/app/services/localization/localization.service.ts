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

/**
 * A Localization service.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  /** Non-breaking space character. */
  public readonly nonBreakingSpace = '\u00A0'; // &nbsp;
  // public readonly nonBreakingSpace = '\u202F';

  /** Short date format. */
  public readonly dateFormatShort = 'yyyy';

  /** Middle date format. */
  public readonly dateFormatMiddle = 'MM.yyyy';

  /** Full date format. */
  public readonly dateFormatFull = 'd.MM.yyyy';

  /** Long date format. */
  public readonly dateFormatLong = 'MMMM' + this.nonBreakingSpace + 'yyyy';

  /**
   * Constructs the Localization service.
   * ~constructor
   *
   */
  constructor(
  ) {
  }

  /** Default shorter date format. */
  public dateFormatShorter(decorations: boolean) { return decorations ? this.dateFormatMiddle : this.dateFormatShort; }

  /** Default longer date format. */
  public dateFormatLonger(decorations: boolean) { return decorations ? this.dateFormatLong : this.dateFormatMiddle; }
}
