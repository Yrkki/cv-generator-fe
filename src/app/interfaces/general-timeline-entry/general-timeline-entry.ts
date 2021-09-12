// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Indexable } from '../indexable';

/**
 * General timeline entry interface.
 * ~extends {@link Indexable}
 */
export interface GeneralTimelineEntry extends Indexable {
  /** The Id */
  'Id': number;
  /** The From */
   'From': number;
  /** The To */
   'To': number;
  /** The From Year */
   'From Year': number;
  /** The From Month */
   'From Month': number;
  /** The Imported Name */
   'Imported Name': string;
  /** The Months total */
   'Months total': number;
  /** The Duration total */
   'Duration total': string;
  /** The Name */
   'Name': string;
  /** The Start */
   'Start': number;
  /** The Years total */
   'Years total': number;
  /** The Type */
   'Type': string;
  /** The Color */
   'Color': string;
}
