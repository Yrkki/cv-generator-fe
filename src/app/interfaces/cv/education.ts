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
