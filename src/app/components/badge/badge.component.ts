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
import { Component, Input } from '@angular/core';

import { Indexable } from '../../interfaces/indexable';

import { UiService } from '../../services/ui/ui.service';
import { StringExService } from '../../services/string-ex/string-ex.service';

import { Badge } from '../../interfaces/badge/badge';

/**
 * Badge component.
 */
@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  /** The component key */
  #key: Badge = { Text: 'badge', Image: '', Link: '' };
  /** The component key getter */
  public get key() { return this.#key; }
  /** The component key setter */
  @Input() public set key(value) { this.#key = value; }

  /** The replacement map */
  #replacementMap: Indexable<string> = {};
  /** The replacement map getter */
  public get replacementMap() { return this.#replacementMap; }
  /** The replacement map setter */
  @Input() public set replacementMap(value: Indexable<string>) { this.#replacementMap = value; }

  /**
   * Constructs the badge component.
   *
   * @param uiService The ui service injected dependency.
   */
  constructor(
    private uiService: UiService,
  ) { }

  /** Production ready predicate. */
  public productionReady(key?: string): boolean {
    return key ? key.length == 0 : true;
  }

  /** UI safe text delegate. */
  public uiText(key: string): string { return this.uiService.uiText(key); }

  /** Link label delegate. */
  public linkLabel(key: string | undefined): string {
    return this.uiService.linkLabel(key);
  }

  /** Preprocess url. */
  public preprocessUrl(url: string): string {
    for (const key in this.#replacementMap) {
      if (Object.prototype.hasOwnProperty.call(this.#replacementMap, key)) {
        const element = this.#replacementMap[key];
        url = this.replaceAll(url, `{{ ${key} }}`, element);
      }
    }
    return url;
  }

  /** Replace all delegate. */
  private replaceAll(str: string, search: string | RegExp, replacement: any): string {
    return StringExService.replaceAll(str, search, replacement);
  }
}
