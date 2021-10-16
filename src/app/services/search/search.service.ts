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
import { Injectable } from '@angular/core';

import { FilterService } from '../../services/filter/filter.service';

import { ModelModel } from '../../model/model/model.model';

/**
 * A search service.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  /** Search query string expression getter. */
  public get SearchToken(): string { return this.model.portfolioModel.searchToken; }
  /** Search query string expression setter. */
  public set SearchToken(value: string) {
    this.model.portfolioModel.searchToken = value;
    this.filterService.searchTokenChangeHandler();
  }

  /** Search query string expression changed event delegate. */
  public readonly searchTokenChanged$ = this.filterService.searchTokenChanged$;

  /**
   * Constructs the Search service.
   * ~constructor
   *
   * @param filterService The filter service injected dependency.
   * @param model The model injected dependency.
   */
  constructor(
    public readonly filterService: FilterService,
    public readonly model: ModelModel,
  ) {
  }

  /**
   * Updates the search with a new search query initiating a new search.
   *
   * @param event The initiating click event.
   */
  public updateSearchToken(event: MouseEvent) {
    const target = event.target as HTMLAnchorElement;
    if (target.title.includes(this.filterService.countCacheService.uiService.uiText('Search for this'))) {
      event.stopPropagation();
      this.SearchToken = target.innerHTML;
    }
  }
}
