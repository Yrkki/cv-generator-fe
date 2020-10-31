import { Injectable } from '@angular/core';

import { Cv as CV } from '../../classes/cv/cv';
import { Entities } from '../../classes/entities/entities';
import { Ui as UI } from '../../classes/ui/ui';

import { ProfessionalExperience } from '../../interfaces/cv/professional-experience';
import { Education } from '../../interfaces/cv/education';
import { Course } from '../../interfaces/cv/course';
import { Publication } from '../../interfaces/cv/publication';
import { Project} from '../../interfaces/project/project';

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

  /** Filtered professional experience for the current search context. */
  public filteredProfessionalExperience: ProfessionalExperience[] = [];
  /** Filtered education for the current search context. */
  public filteredEducation: Education[] = [];

  /** Filtered accomplishments for the current search context. */
  public filteredAccomplishments: Course[] = [];
  /** Filtered certifications for the current search context. */
  public filteredCertifications: Course[] = [];
  /** Filtered courses for the current search context. */
  public filteredCourses: Course[] = [];
  /** Filtered organizations for the current search context. */
  public filteredOrganizations: Course[] = [];
  /** Filtered publications for the current search context. */
  public filteredPublications: Publication[] = [];

  /** Filtered projects for the current search context. */
  public filteredProjects: Project[] = [];

  /** Search query string expression. */
  public searchToken = '';

  /**
   * Constructs the portfolio model.
   * ~constructor
   */
  constructor(
  ) {
  }
}
