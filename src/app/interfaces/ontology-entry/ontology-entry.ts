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
 * Ontology entry interface.
 * ~extends {@link Indexable}
 */
export interface OntologyEntry extends Indexable {
  /** The entity. */
  Entity: string;
  /** The parent. */
  Parent: string;
  /** The multi-parent. */
  MultiParent: string;
  /** The color. */
  Color: string;
  /** The category. */
  category: string;
  /** The path. */
  path: Array<string>;
  /** The display path. */
  displayPath: string;
  /** The multi-parent. */
  multiParents: Array<string>;
  /** The multi-path. */
  multiPaths: Array<Array<string>>;
  // /** The display multi-path. */
  // displayMultiPaths: Array<string>;
  /** The selected parent. */
  selectedParent: string;
}
