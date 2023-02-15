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

/**
 * Classifiable connection abstract service. Not an Injectable!
 */
export abstract class ClassifiableService {
  /**
   * Constructs the Classifiable service.
   * ~constructor
   */
  constructor(
  ) {
  }

  /**
   * Whether accomplishment is of type specified.
   *
   * @param accomplishment The accomplishment to test.
   * @param accomplishmentType The accomplishment type to test.
   *
   * @returns whether accomplishment is of the type specified.
   */
  protected isOfType(accomplishment: Accomplishment, accomplishmentType: string): boolean {
    return [accomplishmentType].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type honor.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type honor.
   */
   protected isHonor(accomplishment: Accomplishment): boolean {
    return ['School leadership position', 'Honor'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type award.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type award.
   */
  protected isAward(accomplishment: Accomplishment): boolean {
    return ['Summer course scholarship', 'Award'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type honor or achievement.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type honor or achievement.
   */
  protected isAchievement(accomplishment: Accomplishment): boolean {
    return ['Academic achievement', 'Achievement'].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type conference.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type conference.
   */
  protected isConference(accomplishment: Accomplishment): boolean {
    return ['Eventbrite', 'Meetup', 'Club', 'Conference'].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type volunteer work.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type volunteer work.
   */
  protected isVolunteerWork(accomplishment: Accomplishment): boolean {
    return ['Eclipse-chaser trip', 'Brigade', 'Seminar', 'Computing', 'Volunteer Work'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type volunteering interest.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type volunteering interest.
   */
  protected isVolunteeringInterest(accomplishment: Accomplishment): boolean {
    return ['Ownership', 'Spaceflight', 'Competition'].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type interest.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type interest.
   */
  protected isInterest(accomplishment: Accomplishment): boolean {
    // return this.isBreakInterest(accomplishment) ||
    //   this.isArt(accomplishment) ||
    return this.isArt(accomplishment) ||
      this.isLanguageCourse(accomplishment) ||
      ['Travel', 'Influence', 'Interest'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type hobby.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type hobby.
   */
  protected isHobby(accomplishment: Accomplishment): boolean {
    // return ['Training???', 'Competition???', 'Sport', 'Hobby']
    return ['Sport', 'Hobby'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type break interest.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type break interest.
   */
  protected isBreakInterest(accomplishment: Accomplishment): boolean {
    return ['Gamecation', 'Binge-watching'].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type break.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type break.
   */
  protected isBreak(accomplishment: Accomplishment): boolean {
    return this.isBreakInterest(accomplishment) ||
      ['Sabbatical', 'Pandemic', 'NDA NCC NSA', 'Break'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type camp.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type camp.
   */
  protected isCamp(accomplishment: Accomplishment): boolean {
    return ['Training', 'Camp'].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type art.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type art.
   */
  protected isArt(accomplishment: Accomplishment): boolean {
    return ['Music lessons', 'Art'].includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type language course.
   *
   * @param accomplishment The accomplishment to test.
   *
   * @returns whether accomplishment is of type language course.
   */
  protected isLanguageCourse(accomplishment: Accomplishment): boolean {
    return ['Language course'].includes(accomplishment.Type);
  }
}
