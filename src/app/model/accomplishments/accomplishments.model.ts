import { Injectable } from '@angular/core';
import { Indexable } from '../../interfaces/indexable';

/**
 * An accomplishments model.
 */
@Injectable({
  providedIn: 'root'
})
export class AccomplishmentsModel {
  /** The state of the dependencies determining whether should collapse the projects accomplishments section. */
  public projectsAccomplishmentShouldCollapseState: Indexable<boolean> = {};

  /**
   * Constructs the accomplishments model.
   * ~constructor
   */
  constructor(
  ) {
  }
}
