import { Course as IAccomplishment } from '../../interfaces/cv/course';
import { Indexable } from '../indexable';

/**
 * Accomplishment class.
 * ~extends {@link Indexable}
 * ~implements {@link ICourse}
 */
export class Accomplishment extends Indexable implements IAccomplishment {
  /** The Id */
  'Id': number;
  /** The Name */
  'Name': string;
  /** The URL */
  'URL': string;
  /** The Authority name */
  'Authority name': string;
  /** The Authority URL */
  'Authority URL': string;
  /** The Authority image */
  'Authority image': string;
  /** The Type */
  'Type' = 'Course';
  /** The Level */
  'Level': string;
  /** The Location */
  'Location': string;
  /** The Started */
  'Started': number;
  /** The Completed */
  'Completed': number;
  /** The Expiration? */
  'Expiration?': any;
  /** The Certificate number */
  'Certificate number': string;
  /** The Certificate URL */
  'Certificate URL': string;
  /** The Certificate image */
  'Certificate image': string;
  /** The Certificate image URL */
  'Certificate image URL': string;
  /** The Certificate logo */
  'Certificate logo': string;
  /** The Certificate tag */
  'Certificate tag': string;
  /** The Color */
  'Color': string;

  /**
   * Whether accomplishment is of type language.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type language.
   */
  public static isLanguage(accomplishment: Accomplishment): boolean {
    return accomplishment.Language > '';
  }

  /**
   * Whether accomplishment is of type certification.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type certification.
   */
  public static isCertification(accomplishment: Accomplishment): boolean {
    return ['Certification'].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type organization.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type organization.
   */
  public static isOrganization(accomplishment: Accomplishment): boolean {
    return ['Conference', 'Eventbrite', 'Meetup', 'Club'].includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type volunteer work.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type volunteer work.
   */
  private static isVolunteerWork(accomplishment: Accomplishment): boolean {
    return ['Eclipse-chaser trip', 'Brigade', 'Seminar', 'Computing']
      .includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type volunteering interest.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type volunteering interest.
   */
  private static isVolunteeringInterest(accomplishment: Accomplishment): boolean {
    return ['Ownership', 'Spaceflight', 'Competition']
      .includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type volunteering.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type volunteering.
   */
  public static isVolunteering(accomplishment: Accomplishment): boolean {
    return this.isVolunteerWork(accomplishment) ||
      this.isVolunteeringInterest(accomplishment);
  }

  /**
   * Whether accomplishment is of type interest.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type interest.
   */
  private static isInterest(accomplishment: Accomplishment): boolean {
    // return this.isBreakInterest(accomplishment) ||
    // return this.isArt(accomplishment) ||
    // return this.isLanguageCourse(accomplishment) ||
    return ['Travel', 'Influence']
      .includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type hobby.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type hobby.
   */
  private static isHobby(accomplishment: Accomplishment): boolean {
    // return ['Training???', 'Competition???', 'Sport', 'Hobby']
    return ['Sport', 'Hobby']
      .includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type interest or hobby.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type interest or hobby.
   */
  private static isInterestAndHobby(accomplishment: Accomplishment): boolean {
    return this.isInterest(accomplishment) ||
      this.isHobby(accomplishment);
  }
  /**
   * Whether accomplishment is of break interest.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of break interest.
   */
  private static isBreakInterest(accomplishment: Accomplishment): boolean {
    return ['Gamecation', 'Binge-watching']
      .includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of break.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of break.
   */
  private static isBreak(accomplishment: Accomplishment): boolean {
    return this.isBreakInterest(accomplishment) ||
      ['Sabbatical', 'Pandemic', 'NDA NCC NSA']
        .includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type vacation.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type vacation.
   */
  public static isVacation(accomplishment: Accomplishment): boolean {
    // return this.isHobby(accomplishment) ||
    return this.isInterestAndHobby(accomplishment) ||
      this.isBreak(accomplishment) ||
      // ['Camp', 'Vacation']
      ['Training', 'Camp', 'Vacation']
        .includes(accomplishment.Type);
  }

  /**
   * Whether accomplishment is of type art.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type art.
   */
  private static isArt(accomplishment: Accomplishment): boolean {
    return ['Music lessons']
      .includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type language course.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type language course.
   */
  private static isLanguageCourse(accomplishment: Accomplishment): boolean {
    return ['Language course']
      .includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type course.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type course.
   */
  public static isCourse(accomplishment: Accomplishment): boolean {
    return !Accomplishment.isCertification(accomplishment)
      && !Accomplishment.isOrganization(accomplishment)
      && !Accomplishment.isVolunteering(accomplishment)
      && !Accomplishment.isVacation(accomplishment);
  }

  /**
   * Whether accomplishment is of type honor.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type honor.
   */
  private static isHonor(accomplishment: Accomplishment): boolean {
    return ['School leadership position', 'Honor']
      .includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type award.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type award.
   */
  private static isAward(accomplishment: Accomplishment): boolean {
    return ['Summer course scholarship', 'Award']
      .includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type honor or achievement.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type honor or achievement.
   */
  private static isAchievement(accomplishment: Accomplishment): boolean {
    return ['Academic achievement', 'Achievement']
      .includes(accomplishment.Type);
  }
  /**
   * Whether accomplishment is of type honor or award.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type honor or award.
   */
  public static isHonorAndAward(accomplishment: Accomplishment): boolean {
    return this.isHonor(accomplishment) ||
      this.isAward(accomplishment) ||
      this.isAchievement(accomplishment);
  }
}
