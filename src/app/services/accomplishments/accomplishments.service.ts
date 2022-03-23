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
import { Injectable } from '@angular/core';
import { AccomplishmentsModel } from '../../model/accomplishments/accomplishments.model';

/**
 * An accomplishments service.
 */
@Injectable({
  providedIn: 'root'
})
export class AccomplishmentsService {
  /** The state of the dependencies determining whether should collapse the projects accomplishments section. */
  public get projectsAccomplishmentShouldCollapseState() { return this.accomplishmentsModel.projectsAccomplishmentShouldCollapseState; }

  /** The property bound to the collapsed state of the project accomplishments section. */
  public get projectsAccomplishmentClassList(): string {
    return Object.values(this.projectsAccomplishmentShouldCollapseState).includes(true) ? 'collapse' : 'collapse show';
  }

  /**
   * Constructs the Accomplishments service.
   * ~constructor
   *
   * @param accomplishmentsModel The accomplishments model injected dependency.
   */
  constructor(
    public accomplishmentsModel: AccomplishmentsModel
  ) {
  }
}
