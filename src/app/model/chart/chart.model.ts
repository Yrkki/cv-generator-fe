// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Injectable } from '@angular/core';
import { Indexable } from '../../interfaces/indexable';

/**
 * An chart model.
 */
@Injectable({
  providedIn: 'root'
})
export class ChartModel {
  /** A map of charts by chart type that are already loaded. */
  public chartLoaded: Indexable<boolean> = {};

  /**
   * Constructs the chart model.
   * ~constructor
   */
  constructor(
  ) {
  }
}
