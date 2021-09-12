// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Indexable } from '../indexable';

/**
 * UiEntry interface.
 * ~extends {@link Indexable}
 */
export interface UiEntry extends Indexable {
  /** The text */
  'text': string;
}
