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
