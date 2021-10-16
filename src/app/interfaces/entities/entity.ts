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
 * Entity interface.
 * ~extends {@link Indexable}
 */
export interface Entity extends Indexable {
  /** The node (name). */
  'node': string;
  /** The parent. */
  'parent': string;
  /** The element class. */
  'class': string;
  /** Whether the entityis a main one. */
  'main': string;

  /** The key calculated filed. */
  'key': string;
  /** The cache key calculated filed. */
  'cacheKey': string;
  /** The section name calculated filed. */
  'section': string;
  /** The chart element name calculated filed. */
  'chart': string;
  /** The content element name calculated filed. */
  'content': string;
  /** The columns element name calculated filed. */
  'columns': string;
  /** The content columns element name calculated filed. */
  'contentColumns': string;
  /** The layout columns element name calculated filed. */
  'layoutColumns': string;
  /** Whether to apply lexical analysis euristics when parsing each value encountered. */
  'AI': boolean;
  /** Emphasized symbol. */
  'emSymbol': boolean;
}
