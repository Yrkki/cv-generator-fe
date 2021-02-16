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
  public static isLanguage(accomplishment: Accomplishment): accomplishment is Accomplishment {
    return accomplishment.Language > '';
  }
  // public get isLanguage(): boolean {
  //   return ['Language'].includes(this.Type);
  // }

  /**
   * Whether accomplishment is of type certification.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type certification.
   */
  public static isCertification(accomplishment: Accomplishment): accomplishment is Accomplishment {
    return ['Certification'].includes(accomplishment.Type);
  }
  // public get isCertification(): boolean {
  //   return ['Certification'].includes(this.Type);
  // }

  /**
   * Whether accomplishment is of type organization.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type organization.
   */
  public static isOrganization(accomplishment: Accomplishment): accomplishment is Accomplishment {
    return ['Conference', 'Eventbrite', 'Meetup', 'Club'].includes(accomplishment.Type);
  }
  // public get isOrganization(): boolean {
  //   return ['Conference', 'Eventbrite', 'Meetup', 'Club'].includes(this.Type);
  // }

  /**
   * Whether accomplishment is of type volunteering.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type volunteering.
   */
  public static isVolunteering(accomplishment: Accomplishment): accomplishment is Accomplishment {
    return ['Brigade', 'Eclipse-chaser trip', 'Seminar', 'Ownership', 'Computing', 'Spaceflight', 'Competition']
      .includes(accomplishment.Type);
  }
  // public get isVolunteering(): boolean {
  //   return ['Brigade', 'Eclipse-chaser trip', 'Seminar', 'Ownership', 'Computing', 'Spaceflight', 'Competition'].includes(this.Type);
  // }

  /**
   * Whether accomplishment is of type vacation.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type vacation.
   */
  public static isVacation(accomplishment: Accomplishment): boolean {
    return ['Sabbatical', 'Pandemic', 'Gamecation', 'Binge-watching', 'NDA NCC NSA'].includes(accomplishment.Type);
  }
  // public get isVacation(): boolean {
  //   return ['Sabbatical', 'Pandemic', 'Gamecation', 'Binge-watching', 'NDA NCC NSA'].includes(this.Type);
  // }

  /**
   * Whether accomplishment is of type course.
   * @param accomplishment The accomplishment to test.
   * @returns whether accomplishment is of type course.
   */
  public static isCourse(accomplishment: Accomplishment): accomplishment is Accomplishment {
    return !Accomplishment.isCertification(accomplishment)
      && !Accomplishment.isOrganization(accomplishment)
      && !Accomplishment.isVolunteering(accomplishment)
      && !Accomplishment.isVacation(accomplishment);
  }
  // public get isCourse(): boolean {
  //   return !this.isCertification
  //     && !this.isOrganization
  //     && !this.isVolunteering
  //     && !this.isVacation;
  // }
}
