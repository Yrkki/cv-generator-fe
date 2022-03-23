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
import { Indexable } from '../indexable';
import { Accomplishment } from './accomplishment';

/**
 * Publication interface.
 * ~extends {@link Indexable}
 */
export interface Publication extends Indexable, Accomplishment {
  /** The Id */
  'Id': number;
  /** The Article */
  'Article': string;
  /** The Article author */
  'Article author': string;
  /** The Article date */
  'Article date': string;
  /** The Title */
  'Title': string;
  /** The Subtitle */
  'Subtitle': string;
  /** The Translation Article */
  'Translation Article': string;
  /** The Translation Title */
  'Translation Title': string;
  /** The Translation Subtitle */
  'Translation Subtitle': string;
  /** The Translator */
  'Translator': string;
  /** The Editor */
  'Editor': string;
  /** The Publisher */
  'Publisher': string;
  /** The Publication date */
  'Publication date': string;
  /** The Type */
  'Type': string;
  /** The Author */
  'Author': string;
  /** The City */
  'City': string;
  /** The Page count */
  'Page count': string;
  /** The Pages */
  'Pages': string;
  /** The Size */
  'Size': string;
  /** The Format */
  'Format': string;
  /** The ISBN */
  'ISBN': string;
  /** The URL */
  'URL': string;
  /** The Publication image */
  'Publication image': string;
  /** The Description */
  'Description': any[];
  /** The Color */
  'Color': string;
}
