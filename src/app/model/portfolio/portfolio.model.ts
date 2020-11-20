import { Injectable } from '@angular/core';

import { Cv as CV } from '../../classes/cv/cv';
import { Entities } from '../../classes/entities/entities';
import { Ui as UI } from '../../classes/ui/ui';

import { ProfessionalExperience } from '../../interfaces/cv/professional-experience';
import { Education } from '../../interfaces/cv/education';

import { Accomplishment } from '../../classes/accomplishment/accomplishment';

import { Language } from '../../interfaces/cv/language';
import { Publication } from '../../interfaces/cv/publication';
import { Project } from '../../interfaces/project/project';

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

  /** Filtered items for the current search context. */
  public get filtered() {
    return {
      get ProfessionalExperience() { return this.c.filteredProfessionalExperience; }, set ProfessionalExperience(value) {
        this.c.filteredProfessionalExperience = value;
      },
      get Education() { return this.c.filteredEducation; }, set Education(value) { this.c.filteredEducation = value; },

      get Accomplishments() { return this.c.filteredAccomplishments; }, set Accomplishments(value) {
        this.c.filteredAccomplishments = value;
        this.Certifications = value.filter(_ => Accomplishment.isCertification(_));
        this.Courses = value.filter(_ => Accomplishment.isCourse(_));
        this.Organizations = value.filter(_ => Accomplishment.isOrganization(_));
        this.Volunteering = value.filter(_ => Accomplishment.isVolunteering(_));
      },
      get Certifications() { return this.c.filteredCertifications; }, set Certifications(value) { this.c.filteredCertifications = value; },
      get Languages() { return this.c.filteredLanguages; }, set Languages(value) { this.c.filteredLanguages = value; },
      get Courses() { return this.c.filteredCourses; }, set Courses(value) { this.c.filteredCourses = value; },
      get Organizations() { return this.c.filteredOrganizations; }, set Organizations(value) { this.c.filteredOrganizations = value; },
      get Volunteering() { return this.c.filteredVolunteering; }, set Volunteering(value) { this.c.filteredVolunteering = value; },
      get Publications() { return this.c.filteredPublications; }, set Publications(value) { this.c.filteredPublications = value; },

      get Projects() { return this.c.filteredProjects; }, set Projects(value) { this.c.filteredProjects = value; },

      c: this,
    };
  }

  /** Filtered professional experience for the current search context. */
  private filteredProfessionalExperience: ProfessionalExperience[] = [];
  /** Filtered education for the current search context. */
  private filteredEducation: Education[] = [];

  /** Filtered accomplishments for the current search context. */
  private filteredAccomplishments: Accomplishment[] = [];
  /** Filtered certifications for the current search context. */
  private filteredCertifications: Accomplishment[] = [];
  /** Filtered languages for the current search context. */
  private filteredLanguages: Language[] = [];
  /** Filtered courses for the current search context. */
  private filteredCourses: Accomplishment[] = [];
  /** Filtered organizations for the current search context. */
  private filteredOrganizations: Accomplishment[] = [];
  /** Filtered volunteering for the current search context. */
  private filteredVolunteering: Accomplishment[] = [];
  /** Filtered publications for the current search context. */
  private filteredPublications: Publication[] = [];

  /** Filtered projects for the current search context. */
  private filteredProjects: Project[] = [];

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
