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

import { Cv as CV } from '../../classes/cv/cv';

import { ProfessionalExperience } from '../../interfaces/cv/professional-experience';
import { Education } from '../../interfaces/cv/education';

import { Accomplishment } from '../../classes/accomplishment/accomplishment';

import { Language } from '../../interfaces/cv/language';
import { Publication } from '../../interfaces/cv/publication';
import { Project } from '../../interfaces/project/project';

import { GeneralTimelineEntry } from '../../classes/general-timeline-entry/general-timeline-entry';

import { ClassifierService } from '../../services/classifier/classifier.service';

import { EntitiesModel } from '../entities/entities.model';

/**
 * A portfolio model.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioModel {
  /** CV data. */
  public cv = new CV();
  // /** Ontology data. */
  // public ontology = new Ontology();

  // /** Entities data. */
  // public entities = new Entities();
  /** Entities getter. */
  public get entities() { return this.entitiesModel.entities; }
  /** Entities setter. */
  public set entities(value) { this.entitiesModel.entities = value; }
  // /** UI data. */
  // public ui = new UI();
  /** UI data getter. */
  public get ui() { return this.entitiesModel.ui; }
  /** UI data setter. */
  public set ui(value) { this.entitiesModel.ui = value; }

  /** Projects data. */
  public projects = new Array<Project>();

  /** General timeline data. */
  public generalTimeline = new Array<GeneralTimelineEntry>();

  /** Filtered items for the current search context. */
  // eslint-disable-next-line max-lines-per-function
  public get filtered() {
    return {
      get ProfessionalExperience() { return this.c.filteredProfessionalExperience; }, set ProfessionalExperience(value) {
        this.c.filteredProfessionalExperience = value;
      },
      get Education() { return this.c.filteredEducation; }, set Education(value) { this.c.filteredEducation = value; },

      get Accomplishments() { return this.c.filteredAccomplishments; }, set Accomplishments(value) {
        this.c.filteredAccomplishments = value;
        this.Certifications = value.filter((_) => this.c.classifierService.isCertification(_));
        this.Courses = value.filter((_) => this.c.classifierService.isCourse(_));
        this.Organizations = value.filter((_) => this.c.classifierService.isOrganization(_));
        this.HonorsAndAwards = value.filter((_) => this.c.classifierService.isHonorAndAward(_));
        this.Volunteering = value.filter((_) => this.c.classifierService.isVolunteering(_));
        this.InterestsAndHobbies = value.filter((_) => this.c.classifierService.isInterestAndHobby(_));
        this.Vacation = value.filter((_) => this.c.classifierService.isVacation(_));
      },
      get Certifications() { return this.c.filteredCertifications; }, set Certifications(value) { this.c.filteredCertifications = value; },
      get Languages() { return this.c.filteredLanguages; }, set Languages(value) { this.c.filteredLanguages = value; },
      get Courses() { return this.c.filteredCourses; }, set Courses(value) { this.c.filteredCourses = value; },
      get Organizations() { return this.c.filteredOrganizations; }, set Organizations(value) { this.c.filteredOrganizations = value; },
      get HonorsAndAwards() { return this.c.filteredHonorsAndAwards; },
      set HonorsAndAwards(value) { this.c.filteredHonorsAndAwards = value; },
      get Volunteering() { return this.c.filteredVolunteering; }, set Volunteering(value) { this.c.filteredVolunteering = value; },
      get InterestsAndHobbies() { return this.c.filteredInterestsAndHobbies; },
      set InterestsAndHobbies(value) { this.c.filteredInterestsAndHobbies = value; },
      get Vacation() { return this.c.filteredVacation; }, set Vacation(value) { this.c.filteredVacation = value; },
      get Publications() { return this.c.filteredPublications; }, set Publications(value) { this.c.filteredPublications = value; },

      get Projects() { return this.c.filteredProjects; }, set Projects(value) { this.c.filteredProjects = value; },

      get TimelineEvents() { return this.c.filteredTimelineEvents; }, set TimelineEvents(value) { this.c.filteredTimelineEvents = value; },

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
  /** Filtered honors and awards for the current search context. */
  private filteredHonorsAndAwards: Accomplishment[] = [];
  /** Filtered volunteering for the current search context. */
  private filteredVolunteering: Accomplishment[] = [];
  /** Filtered interests and hobbies for the current search context. */
  private filteredInterestsAndHobbies: Accomplishment[] = [];
  /** Filtered vacation for the current search context. */
  private filteredVacation: Accomplishment[] = [];
  /** Filtered publications for the current search context. */
  private filteredPublications: Publication[] = [];

  /** Filtered projects for the current search context. */
  private filteredProjects: Project[] = [];

  /** Filtered timeline events for the current search context. */
  private filteredTimelineEvents: GeneralTimelineEntry[] = [];

  /** Search query string expression. */
  public searchToken = '';

  /**
   * Reclassify accomplishments.
   */
  public ReclassifyAccomplishments() {
    // this.classifierService.rotateClassifierKind(event);
    const accomplishments = this.filtered.Accomplishments;
    if (accomplishments) {
      this.cv.Courses = accomplishments;
      this.filtered.Accomplishments = accomplishments;
    }
    this.classifierService.ontologyService.ontologyAdjusterService.adjustOntology();
  }

  /**
   * Constructs the portfolio model.
   * ~constructor
   *
   * @param classifierService The classifier service injected dependency.
   * @param entitiesModel The entities model injected dependency.
   */
  constructor(
    public readonly classifierService: ClassifierService,
    private readonly entitiesModel: EntitiesModel,
  ) {
  }
}
