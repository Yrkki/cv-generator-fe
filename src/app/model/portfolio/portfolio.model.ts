import { Injectable } from '@angular/core';

import { Cv as CV } from '../../classes/cv/cv';
import { Entities } from '../../classes/entities/entities';
import { Project } from '../../classes/project/project';
import { Ui as UI } from '../../classes/ui/ui';

import { Indexable } from '../..//interfaces/indexable';
import { ProfessionalExperience } from '../../interfaces/cv/professional-experience';
import { Education } from '../../interfaces/cv/education';
import { Course } from '../../interfaces/cv/course';
import { Publication } from '../../interfaces/cv/publication';

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
  public chartLoaded: Indexable<boolean> = {};

  /** Aggregation count cache. */
  public countCache: Indexable = {};

  /** Filtered professional experience for the current search context. */
  public filteredProfessionalExperience: Indexable<ProfessionalExperience>[] = [];
  /** Filtered education for the current search context. */
  public filteredEducation: Indexable<Education>[] = [];

  /** Filtered certifications for the current search context. */
  public filteredCertifications: Indexable<Course>[] = [];
  /** Filtered accomplishments for the current search context. */
  public filteredAccomplishments: Indexable<Course>[] = [];
  /** Filtered publications for the current search context. */
  public filteredPublications: Indexable<Publication>[] = [];

  /** Filtered projects for the current search context. */
  public filteredProjects: Indexable<Project>[] = [];

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
