// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Indexable } from '../indexable';

/**
 * Context interface.
 * ~extends {@link Indexable}
 */
export interface Context extends Indexable {
  /** The Id */
  id: number;
  /** The Name */
  name: string;
  /** The Storage */
  storage: Storage;
}
