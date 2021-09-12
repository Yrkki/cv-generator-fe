// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Component, Input } from '@angular/core';

import { Indexable } from '../../interfaces/indexable';

import { UiService } from '../../services/ui/ui.service';
import { StringExService } from '../../services/string-ex/string-ex.service';

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
  #key = { Text: 'badge', Image: '', Link: '' };
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
