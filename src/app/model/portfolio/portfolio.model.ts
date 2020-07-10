import { Injectable } from '@angular/core';

import { Cv as CV } from '../../classes/cv/cv';
import { Entities } from '../../classes/entities/entities';
import { Project } from '../../classes/project/project';
import { Ui as UI } from '../../classes/ui/ui';

/**
 * A portfolio model.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioModel {
  /** CV data. */
  public cv = new CV();
  /** Entities data. */
  public entities = new Entities();
  /** Projects data. */
  public projects = new Array<Project>();
  /** UI data. */
  public ui = new UI();

  /** A map of charts by chart type that are already loaded. */
  public chartLoaded = {};

  /** Aggregation count cache. */
  public countCache = {};

  /** Filtered professional experience for the current search context. */
  public filteredProfessionalExperience = [];
  /** Filtered education for the current search context. */
  public filteredEducation = [];

  /** Filtered certifications for the current search context. */
  public filteredCertifications = [];
  /** Filtered accomplishments for the current search context. */
  public filteredAccomplishments = [];
  /** Filtered publications for the current search context. */
  public filteredPublications = [];

  /** Filtered projects for the current search context. */
  public filteredProjects = [];

  /** Search query string expression. */
  public searchToken = '';

  /**
   * Constructs the Portfolio model.
   * ~constructor
   */
  constructor(
  ) {
  }
}
