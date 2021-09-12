// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
/** Indexable interface. */
export interface Indexable<T = any> {
  /** Indexer. */
  [index: string]: T;
}
