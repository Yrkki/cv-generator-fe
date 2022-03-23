// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
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
import { Course as IAccomplishment } from '../../interfaces/cv/course';
import { Indexable } from '../indexable';

/**
 * Accomplishment class.
 * ~extends {@link Indexable}
 * ~implements {@link IAccomplishment}
 */
export class Accomplishment extends Indexable implements IAccomplishment {
  /** The Id */
  'Id': number;
  /** The Name */
  'Name': string;
  /** The URL */
  'URL': string;
  /** The Authority name */
  'Authority name': string;
  /** The Authority URL */
  'Authority URL': string;
  /** The Authority image */
  'Authority image': string;
  /** The Platform */
  'Platform': string;
  /** The Type */
  'Type' = 'Course';
  /** The Level */
  'Level': string;
  /** The Location */
  'Location': string;
  /** The Started */
  'Started': number;
  /** The Completed */
  'Completed': number;
  /** The Expiration */
  'Expiration': any;
  /** The Certificate number */
  'Certificate number': string;
  /** The Certificate URL */
  'Certificate URL': string;
  /** The Certificate image */
  'Certificate image': string;
  /** The Certificate image URL */
  'Certificate image URL': string;
  /** The Certificate logo */
  'Certificate logo': string;
  /** The Certificate tag */
  'Certificate tag': string;
  /** The Color */
  'Color': string;
}
