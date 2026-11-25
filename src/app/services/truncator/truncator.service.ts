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

import { ToggleKind } from '../../enums/toggle-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { ToggleService } from '../../services/toggle/toggle.service';
import { PersistenceService } from '../persistence/persistence.service';
import { StringExService } from '../string-ex/string-ex.service';

/**
 * A truncator service.
 */
@Injectable({
  providedIn: 'root'
})
export class TruncatorService {
  /** Focus threshold feature getter. */
  public get focusThreshold() { return this.feature(ToggleKind.FocusThreshold, [20, 30, 5][this.truncatorKind]); }

  /** Tag cloud emphasis feature getter. */
  public get tagCloudEmphasis() { return this.feature(ToggleKind.TagCloudEmphasis, false); }

  /**
   * A truncator feature, persisted per truncator kind under its long key.
   *
   * @template T The type of the feature value, for example number for the focus threshold.
   *
   * @param toggleKind The toggle kind of the feature, which gives its display value.
   * @param defaultValue The value used while nothing is persisted.
   *
   * @returns The feature.
   */
  private feature<T>(toggleKind: ToggleKind, defaultValue: T) {
    return {
      /** Truncator kind. */
      truncatorKind: this.truncatorKind,
      /** Default. */
      default: defaultValue,
      /** Entity key getter. */
      entityKey: this.entityKey,
      // /** Persistence name getter. */
      // get persistenceName() { return `${TruncatorKind[this.truncatorKind]}${this.propertyName}`; },
      /** Persistence name getter: the long key, e.g. 'Curriculum Vitae focus threshold', 'Project Summary tag cloud emphasis', etc. */
      get persistenceName() { return `${this.entityKey} ${this.displayValue}`; },
      /** Display value getter. */
      get displayValue() { return ToggleService.displayValues.get(toggleKind) ?? ''; },
      /** Property name getter. */
      get propertyName() { return StringExService.toPascalCase(this.displayValue); },
    };
  }

  /** Truncator kind. */
  public truncatorKind = 0 as TruncatorKind;

  /**
   * The entity key of the truncator kind: the main entity whose acronym is the kind's name,
   * for example 'Curriculum Vitae' for Cv. Empty until the entities are loaded, or for an unknown kind.
   */
  public get entityKey(): string {
    const acronym = TruncatorKind[this.truncatorKind]?.toUpperCase();
    const entities = this.persistenceService.entitiesModel.entities ?? {};
    return Object.keys(entities)
      .find((key) => entities[key]?.main === 'true' && StringExService.acronym(key) === acronym) ?? '';
  }

  /** Focus threshold getter. */
  public get FocusThreshold() {
    const focusThresholdDefault = this.persistenceService.getItem(this.focusThreshold.persistenceName)
      ?? this.focusThreshold.default.toString();
    return Number.parseInt(focusThresholdDefault, 10);
  }
  /** Focus threshold setter. */
  public set FocusThreshold(value) {
    this.persistenceService.setItem(this.focusThreshold.persistenceName, value.toString());
  }

  /** Tag cloud emphasis getter. */
  public get TagCloudEmphasis() {
    return (this.persistenceService.getItem(this.tagCloudEmphasis.persistenceName)
      ?? this.tagCloudEmphasis.default.toString()) === 'true';
  }
  /** Tag cloud emphasis setter. */
  public set TagCloudEmphasis(value) {
    this.persistenceService.setItem(this.tagCloudEmphasis.persistenceName, value.toString());
  }

  /**
   * Constructs the Truncator service.
   * ~constructor
   *
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly persistenceService: PersistenceService,
  ) {
  }

  /**
   * Truncated collection.
   *
   * @param collection The collection to process.
   *
   * @returns The truncated collection.
   */
  public truncated(collection: any[]): any[] {
    return collection ? collection.slice(0, this.FocusThreshold) : [];
  }

  /**
   * Remaining collection.
   *
   * @param collection The collection to process.
   *
   * @returns The remaining collection.
   */
  public remaining(collection: any[]): any[] {
    return collection ? collection.slice(this.FocusThreshold) : [];
  }

  /**
   * Remaining collection length.
   *
   * @param collection The collection to process.
   *
   * @returns The remaining collection length.
   */
  public remainingLength(collection: any[]): number {
    return collection ? collection.length - this.FocusThreshold : 0;
  }

  /** Template model value setter function. */
  public modelChange(propertyName: string, value: any) {
    (this as any)[propertyName] = value;
  }
}
