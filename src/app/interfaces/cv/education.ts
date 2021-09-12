// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Indexable } from '../indexable';

/**
 * Education interface.
 * ~extends {@link Indexable}
 */
export interface Education extends Indexable {
  /** The Id */
  'Id': number;
  /** The From */
  'From': number;
  /** The To */
  'To': number;
  /** The School */
  'School': string;
  /** The Field */
  'Field': string;
  /** The Major */
  'Major': string;
  /** The Degree */
  'Degree': string;
  /** The Honors */
  'Honors': string;
  /** The Description */
  'Description': string;
  /** The Link */
  'Link': string;
  /** The Image */
  'Image': string;
  /** The Color */
  'Color': string;
  /** Visual highlight class */
  'Highlight': string;
  /** The Grade */
  'Grade': string;
}
