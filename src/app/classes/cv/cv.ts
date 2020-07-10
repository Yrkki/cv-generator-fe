import { Cv as ICv } from './../../interfaces/cv/cv';
import { PersonalData } from './../../interfaces/cv/personal-data';
import { ProfessionalExperience } from './../../interfaces/cv/professional-experience';
import { Education } from './../../interfaces/cv/education';
import { Certification } from './../../interfaces/cv/certification';
import { Language } from './../../interfaces/cv/Language';
import { Course } from './../../interfaces/cv/course';
import { Publication } from './../../interfaces/cv/publication';

/**
 * CV class.
 * ~implements {@link ICv}
 */
export class Cv implements ICv {
  /** The Personal data */
  'Personal data': PersonalData[];
  /** The Professional experience */
  'Professional experience': ProfessionalExperience[];
  /** The Education */
  'Education': Education[];
  /** The Certifications */
  'Certifications': Certification[];
  /** The Languages */
  'Languages': Language[];
  /** The Courses */
  'Courses': Course[];
  /** The Publications */
  'Publications': Publication[];
  /** The Countries visited */
  'Countries visited': string[];
}
