// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { PersonalData } from './personal-data';
import { ProfessionalExperience } from './professional-experience';
import { Education } from './education';
import { Certification } from './certification';
import { Language } from './language';
import { Course } from './course';
import { Publication } from './publication';
import { Indexable } from '../indexable';

/**
 * CV interface.
 * ~extends {@link Indexable}
 */
export interface Cv extends Indexable {
  /** The Personal data */
  'Personal data': PersonalData[];
  /** The Professional experience */
  'Professional experience': ProfessionalExperience[];
  /** The Education */
  'Education': Education[];
  /** The Certifications */
  'Certifications': Certification[];
  /** The Languages */
  'Languages': Language[];
  /** The Courses */
  'Courses': Course[];
  /** The Publications */
  'Publications': Publication[];
  /** The Countries visited */
  'Countries visited': string[];
}
