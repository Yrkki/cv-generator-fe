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
import { Accomplishment } from '../../interfaces/cv/accomplishment';
import { ClassifierKind } from '../../enums/classifier-kind.enum';

import { PersistenceService } from '../persistence/persistence.service';

/**
 * Classifiable connection abstract service. Not an Injectable!
 */
export abstract class ClassifiableService {
  /** Classifier kind getter. */
  public get classifierKind(): ClassifierKind {
    return Number.parseInt(this.persistenceService.getItem('classifierKind') ?? '0', 10);
  }
  /** Classifier kind setter. */
  public set classifierKind(value: ClassifierKind) { this.persistenceService.setItem('classifierKind', value.toString()); }

  /**
   * Constructs the classifier service.
   * ~constructor
   *
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly persistenceService: PersistenceService,
  ) {
  }

  /**
   * Whether accomplishment is of proper category.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of proper category.
   */
  protected abstract isOfProperCategory: (
    accomplishment: Accomplishment, accomplishmentType: string, predicate?: (_: Accomplishment) => boolean
  ) => boolean;

  /**
   * Whether accomplishment is of type publication.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type publication.
   */
  public isPublication(accomplishment: Accomplishment): boolean {
    return accomplishment.Title > '';
  }

  /**
   * Whether accomplishment is of type language.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type language.
   */
  public isLanguage(accomplishment: Accomplishment): boolean {
    // if (this.classifierKind !== ClassifierKind.Classic) {
    //   return this.isOfProperCategory(accomplishment, 'Language', this.isLanguage);
    // }
    return accomplishment.Language > '';
  }

  /**
   * Whether accomplishment is of type certification.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type certification.
   */
  public isCertification(accomplishment: Accomplishment): boolean {
    if (this.classifierKind !== ClassifierKind.Classic) {
      return this.isOfProperCategory(accomplishment, 'Certification', this.isCertification);
    }
    return ['Certification'].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type organization.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type organization.
   */
  public isOrganization(accomplishment: Accomplishment): boolean {
    if (this.classifierKind !== ClassifierKind.Classic) {
      return this.isOfProperCategory(accomplishment, 'Organization', this.isOrganization);
    }
    return ['Conference', 'Eventbrite', 'Meetup', 'Club'].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type volunteer work.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type volunteer work.
   */
  private isVolunteerWork(accomplishment: Accomplishment): boolean {
    return ['Eclipse-chaser trip', 'Brigade', 'Seminar', 'Computing'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type volunteering interest.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type volunteering interest.
   */
  private isVolunteeringInterest(accomplishment: Accomplishment): boolean {
    return ['Ownership', 'Spaceflight', 'Competition'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type volunteering.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type volunteering.
   */
  public isVolunteering(accomplishment: Accomplishment): boolean {
    if (this.classifierKind !== ClassifierKind.Classic) {
      return this.isOfProperCategory(accomplishment, 'Volunteering', this.isVolunteering);
    }
    return this.isVolunteerWork(accomplishment) ||
      this.isVolunteeringInterest(accomplishment);
  }

  /**
   * Whether accomplishment is of type interest.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type interest.
   */
  private isInterest(accomplishment: Accomplishment): boolean {
    // return this.isBreakInterest(accomplishment) ||
    //   this.isArt(accomplishment) ||
    return this.isArt(accomplishment) ||
      this.isLanguageCourse(accomplishment) ||
      ['Travel', 'Influence'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type hobby.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type hobby.
   */
  private isHobby(accomplishment: Accomplishment): boolean {
    // return ['Training???', 'Competition???', 'Sport', 'Hobby']
    return ['Sport', 'Hobby'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type interest or hobby.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type interest or hobby.
   */
  public isInterestAndHobby(accomplishment: Accomplishment): boolean {
    if (this.classifierKind !== ClassifierKind.Classic) {
      return this.isOfProperCategory(accomplishment, 'Interest and Hobby', this.isInterestAndHobby);
    }
    return this.isInterest(accomplishment) ||
      this.isHobby(accomplishment);
  }
  /**
   * Whether accomplishment is of break interest.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of break interest.
   */
  private isBreakInterest(accomplishment: Accomplishment): boolean {
    return ['Gamecation', 'Binge-watching'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of break.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of break.
   */
  private isBreak(accomplishment: Accomplishment): boolean {
    return this.isBreakInterest(accomplishment) ||
      ['Sabbatical', 'Pandemic', 'NDA NCC NSA'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type vacation.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type vacation.
   */
  public isVacation(accomplishment: Accomplishment): boolean {
    if (this.classifierKind !== ClassifierKind.Classic) {
      return this.isOfProperCategory(accomplishment, 'Vacation', this.isVacation);
    }
    return this.isBreak(accomplishment) ||
      ['Training', 'Camp', 'Vacation'].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type art.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type art.
   */
  private isArt(accomplishment: Accomplishment): boolean {
    return ['Music lessons'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type language course.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type language course.
   */
  private isLanguageCourse(accomplishment: Accomplishment): boolean {
    return ['Language course'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type course.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type course.
   */
  // eslint-disable-next-line complexity
  public isCourse(accomplishment: Accomplishment): boolean {
    if (this.classifierKind !== ClassifierKind.Classic) {
      return this.isOfProperCategory(accomplishment, 'Course', this.isCourse);
    }
    return !this.isCertification(accomplishment)
      && !this.isOrganization(accomplishment)
      && !this.isHonorAndAward(accomplishment)
      && !this.isInterestAndHobby(accomplishment)
      && !this.isVolunteering(accomplishment)
      && !this.isVacation(accomplishment);
  }

  /**
   * Whether accomplishment is of type honor.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type honor.
   */
  private isHonor(accomplishment: Accomplishment): boolean {
    return ['School leadership position', 'Honor'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type award.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type award.
   */
  private isAward(accomplishment: Accomplishment): boolean {
    return ['Summer course scholarship', 'Award'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type honor or achievement.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type honor or achievement.
   */
  private isAchievement(accomplishment: Accomplishment): boolean {
    return ['Academic achievement', 'Achievement'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type honor or award.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type honor or award.
   */
  public isHonorAndAward(accomplishment: Accomplishment): boolean {
    if (this.classifierKind !== ClassifierKind.Classic) {
      return this.isOfProperCategory(accomplishment, 'Honor and Award', this.isHonorAndAward);
    }
    return this.isHonor(accomplishment) ||
      this.isAward(accomplishment) ||
      this.isAchievement(accomplishment);
  }
}
