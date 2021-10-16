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

import { SearchService } from '../../services/search/search.service';
import { FilterService } from '../../services/filter/filter.service';
import { FilterGeneralTimelineService } from '../../services/filter-general-timeline/filter-general-timeline.service';
import { ModelModel } from '../../model/model/model.model';

/**
 * An engine service.
 */
@Injectable({
  providedIn: 'root'
})
export class EngineService {
  /**
   * Constructs the Engine service.
   * ~constructor
   *
   * @param searchService The search service injected dependency.
   * @param filterService The filter service injected dependency.
   * @param filterGeneralTimelineService The filter general timeline service injected dependency.
   * @param model The model injected dependency.
   */
  constructor(
    public readonly searchService: SearchService,
    public readonly filterService: FilterService,
    public readonly filterGeneralTimelineService: FilterGeneralTimelineService,
    public readonly model: ModelModel,
  ) {
  }
}
