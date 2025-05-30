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
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Keys pipe.
 * ~implements {@link PipeTransform}
 */
@Pipe({
  standalone: false,
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  /**
   * Gets the array of keys out of an object.
   * ~override
   *
   * @param value The object to process.
   *
   * @returns The keys array.
   */
  transform(value: Record<string, unknown>): any {
    return Object.keys(value);
  }
}
