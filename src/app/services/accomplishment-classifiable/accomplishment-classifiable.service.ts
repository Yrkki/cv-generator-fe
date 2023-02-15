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
import { ClassifiableService } from '../classifiable/classifiable.service';

import { Accomplishment } from '../../interfaces/cv/accomplishment';
import { ClassifierKind } from '../../enums/classifier-kind.enum';

import { PersistenceService } from '../persistence/persistence.service';

/**
 * Accomplishment Classifiable connection abstract service. Not an Injectable!
 * ~extends {@link ClassifiableService}
 */
export abstract class AccomplishmentClassifiableService extends ClassifiableService {
  /** Classifier kind getter. */
  public get classifierKind(): ClassifierKind {
    return Number.parseInt(this.persistenceService.getItem('classifierKind') ?? '0', 10);
  }
  /** Classifier kind setter. */
  public set classifierKind(value: ClassifierKind) { this.persistenceService.setItem('classifierKind', value.toString()); }

  /**
   * Constructs the Accomplishment Classifiable service.
   * ~constructor
   *
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    protected readonly persistenceService: PersistenceService,
  ) {
    super();
  }

  /**
   * Whether accomplishment is of type language.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type language.
   */
  public isLanguage(accomplishment: Accomplishment): boolean {
    return accomplishment.Language > '';
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
    const isOfType = this.isOfType(accomplishment, 'Course');
    if (this.classifierKind !== ClassifierKind.Classic) { return isOfType; }

    return isOfType ||
      !this.isCertification(accomplishment)
      && !this.isHonorAndAward(accomplishment)
      && !this.isOrganization(accomplishment)
      && !this.isInterestAndHobby(accomplishment)
      && !this.isVolunteering(accomplishment)
      && !this.isVacation(accomplishment);
  }

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
   * Whether accomplishment is of type certification.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type certification.
   */
  public isCertification(accomplishment: Accomplishment): boolean {
    const isOfType = this.isOfType(accomplishment, 'Certification');
    return isOfType;
  }

  /**
   * Whether accomplishment is of type honor or award.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type honor or award.
   */
   public isHonorAndAward(accomplishment: Accomplishment): boolean {
    const isOfType = this.isOfType(accomplishment, 'Honor and Award');
    if (this.classifierKind !== ClassifierKind.Classic) { return isOfType; }

    return isOfType ||
      super.isHonor(accomplishment) ||
      super.isAward(accomplishment) ||
      super.isAchievement(accomplishment);
  }

  /**
   * Whether accomplishment is of type organization.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type organization.
   */
  public isOrganization(accomplishment: Accomplishment): boolean {
    const isOfType = this.isOfType(accomplishment, 'Organization');
    if (this.classifierKind !== ClassifierKind.Classic) { return isOfType; }

    return isOfType ||
      super.isConference(accomplishment);
  }

  /**
   * Whether accomplishment is of type volunteering.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type volunteering.
   */
  public isVolunteering(accomplishment: Accomplishment): boolean {
    const isOfType = this.isOfType(accomplishment, 'Volunteering');
    if (this.classifierKind !== ClassifierKind.Classic) { return isOfType; }

    return isOfType ||
      super.isVolunteerWork(accomplishment) ||
      super.isVolunteeringInterest(accomplishment);
  }

  /**
   * Whether accomplishment is of type interest or hobby.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type interest or hobby.
   */
  public isInterestAndHobby(accomplishment: Accomplishment): boolean {
    const isOfType = this.isOfType(accomplishment, 'Interest and Hobby');
    if (this.classifierKind !== ClassifierKind.Classic) { return isOfType; }

    return isOfType ||
      super.isInterest(accomplishment) ||
      super.isHobby(accomplishment);
  }

  /**
   * Whether accomplishment is of type vacation.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type vacation.
   */
  public isVacation(accomplishment: Accomplishment): boolean {
    const isOfType = this.isOfType(accomplishment, 'Vacation');
    if (this.classifierKind !== ClassifierKind.Classic) { return isOfType; }

    return isOfType ||
      super.isBreak(accomplishment) ||
      super.isCamp(accomplishment);
  }
}
