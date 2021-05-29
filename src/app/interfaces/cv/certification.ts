import { Indexable } from '../indexable';

/**
 * Certification interface.
 * ~extends {@link Indexable}
 */
export interface Certification extends Indexable {
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
  'Type': string;
  /** The Level */
  'Level': string;
  /** The Location */
  'Location': string;
  /** The Started */
  'Started': number;
  /** The Completed */
  'Completed': number;
  /** The Expiration */
  'Expiration': number;
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
}
