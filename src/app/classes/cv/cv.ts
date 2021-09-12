// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Cv as ICv } from './../../interfaces/cv/cv';
import { PersonalData } from './../../interfaces/cv/personal-data';
import { ProfessionalExperience } from './../../interfaces/cv/professional-experience';
import { Education } from './../../interfaces/cv/education';
import { Certification } from './../../interfaces/cv/certification';
import { Language } from './../../interfaces/cv/language';
import { Course } from './../../interfaces/cv/course';
import { Publication } from './../../interfaces/cv/publication';
import { Indexable } from '../indexable';

/**
 * CV class.
 * ~extends {@link Indexable}
 * ~implements {@link ICv}
 */
export class Cv extends Indexable implements ICv {
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
