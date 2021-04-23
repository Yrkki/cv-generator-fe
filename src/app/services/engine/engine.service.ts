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
