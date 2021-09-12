// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
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
    private accomplishmentsModel: AccomplishmentsModel
  ) {
  }
}
