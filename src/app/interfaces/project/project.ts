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
 * Project interface.
 * ~extends {@link Indexable}
 */
export interface Project extends Indexable {
  /** The Id */
  'Id': number;
  /** The Project name */
   'Project name': string;
  /** The Scope */
   'Scope': string;
  /** The Client */
   'Client': string;
  /** The Logo */
   'Logo': string;
  /** The Country */
   'Country': string;
  /** The Industry */
   'Industry': string;
  /** The Project type */
   'Project type': string;
  /** The System type */
   'System type': string;
  /** The Platform */
   'Platform': string;
  /** The Architecture */
   'Architecture': string;
  /** The Languages and notations */
   'Languages and notations': string;
  /** The IDEs and Tools */
   'IDEs and Tools': string;
  /** The Methodology and practices */
   'Methodology and practices': string;
  /** The Team size */
   'Team size': number;
  /** The Responsibilities */
   'Responsibilities': string;
  /** The Role */
   'Role': string;
  /** The Position */
   'Position': string;
  /** The From */
   'From': number;
  /** The To */
   'To': number;
  /** The Months total */
   'Months total': number;
  /** The Duration total */
   'Duration total': string;
  /** The Reference */
   'Reference': string;
  /** The Links */
   'Links': string;
  /** The Photos */
   'Photos': string;
  /** The Attribution */
   'Attribution': string;
  /** The Client link */
   'Client link': string;
  /** The Period */
   'Period': string;
  /** The Color */
  'Color': string;
}
