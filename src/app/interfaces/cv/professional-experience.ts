// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Indexable } from '../indexable';

/**
 * Professional experience interface.
 * ~extends {@link Indexable}
 */
export interface ProfessionalExperience extends Indexable {
  /** The Id */
  'Id': number;
  /** The From */
  'From': number;
  /** The To */
  'To': number;
  /** The Experience */
  'Experience': string;
  /** The Position */
  'Position': string;
  /** The Description */
  'Description': string[];
  /** The Link */
  'Link': string;
  /** The Image */
  'Image': string;
  /** The Color */
  'Color': string;
  /** Visual highlight class */
  'Highlight': string;
}
