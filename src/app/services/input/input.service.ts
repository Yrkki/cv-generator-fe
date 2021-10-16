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
import { logger } from '../logger/logger.service';

/**
 * An input service.
 */
@Injectable({
  providedIn: 'root'
})
export class InputService {
  /**
   * Simulate keyboard clicks.
   *
   * @param event The keyboard event.
   */
  public keypress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.processKeypressEnter(event);
    }
  }

  /** Process keypress enter. */
  private processKeypressEnter(event: KeyboardEvent) {
    if (event.target) {
      const href = (event.target as HTMLAnchorElement).href;
      if (href) {
        logger.debug(`InputService: keypress: Skipping href: ${href}`);
      } else {
        event.target.dispatchEvent(new MouseEvent('click'));
      }
    }
  }
}
