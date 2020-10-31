import { Injectable } from '@angular/core';

import { Indexable } from '../../interfaces/indexable';

/**
 * An entities model.
 */
@Injectable({
  providedIn: 'root'
})
export class EntitiesModel {
  /** Aggregation count cache. */
  public countCache: Indexable = {};

  /** Frequencies cache. */
  public frequenciesCache: Indexable = {};

  /**
   * Constructs the entities model.
   * ~constructor
   */
  constructor(
  ) {
  }
}
