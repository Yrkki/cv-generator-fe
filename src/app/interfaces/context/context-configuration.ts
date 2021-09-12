// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Indexable } from '../indexable';

/**
 * Context configuration interface.
 * ~extends {@link Indexable}
 */
export interface ContextConfiguration extends Indexable {
  /** The Width */
  width: string;
  /** The Background Color */
  backgroundColor: string;
  /** The Name */
  name: (...args: any[]) => string;
}
