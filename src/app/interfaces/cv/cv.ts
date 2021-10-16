// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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
