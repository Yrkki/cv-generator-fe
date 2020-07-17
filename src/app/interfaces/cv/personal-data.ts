import { Indexable } from '../indexable';

/**
 * Personal data interface.
 * ~extends {@link Indexable}
 */
export interface PersonalData extends Indexable {
  /** The Caption */
  'Caption': string;
  /** The Personal data */
  'Personal data': string;
  /** The Hidden */
  'Hidden': boolean;
  /** Visual highlight class */
  'Highlight': string;
}
