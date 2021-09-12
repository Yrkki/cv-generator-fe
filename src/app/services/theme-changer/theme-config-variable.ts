// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
/** Theme config variable interface. */
export interface ThemeConfigVariable {
  /** Variable name. */
  name: string;
  /** Variable domponents. */
  components:
  {
    name: string;
    base: string;
    offset: string;
  }[];
}
