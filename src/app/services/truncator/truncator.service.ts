// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
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
  /** Focus threshold display values */
  public static readonly focusThresholdDefaults: ReadonlyMap<TruncatorKind, number> = new Map([
    [TruncatorKind.Cv, 20],
    [TruncatorKind.Ps, 30],
    [TruncatorKind.Pp, 5]
  ]);
  /** Focus threshold display value. */
  public static readonly focusThresholdDisplayValue = 'focus threshold';
  /** Focus threshold property name. */
  public static readonly focusThresholdPropertyName = StringExService.toPascalCase(TruncatorService.focusThresholdDisplayValue);

  /** Truncator kind. */
  public truncatorKind!: TruncatorKind;

  /** Tag cloud emphasis getter. */
  public get TagCloudEmphasis() {
    const displayValue = ToggleService.displayValues.get(ToggleKind.TagCloudEmphasis) ?? '';
    const key = `${TruncatorKind[this.truncatorKind].toUpperCase()} ${displayValue}`;
    return this.persistenceService.getItem(key) === 'true';
  }
  /** Tag cloud emphasis setter. */
  public set TagCloudEmphasis(value) {
    const displayValue = ToggleService.displayValues.get(ToggleKind.TagCloudEmphasis) ?? '';
    const key = `${TruncatorKind[this.truncatorKind].toUpperCase()} ${displayValue}`;
    this.persistenceService.setItem(key, value.toString());
  }

  /** Focus threshold getter. */
  public get FocusThreshold() {
    const key = `${TruncatorKind[this.truncatorKind]}${TruncatorService.focusThresholdPropertyName}`;
    return Number.parseInt(
      this.persistenceService.getItem(key)
      ?? TruncatorService.focusThresholdDefaults.get(this.truncatorKind)?.toString()
      ?? '20', 10
    );
  }
  /** Focus threshold setter. */
  public set FocusThreshold(value) {
    const key = `${TruncatorKind[this.truncatorKind]}${TruncatorService.focusThresholdPropertyName}`;
    this.persistenceService.setItem(key, value.toString());
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
