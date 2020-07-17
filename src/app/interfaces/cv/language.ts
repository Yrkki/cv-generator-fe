import { Indexable } from '../indexable';

/**
 * Language interface.
 * ~extends {@link Indexable}
 */
export interface Language extends Indexable {
  /** The Language */
  'Language': string;
  /** The Level */
  'Level': string;
  /** The Score */
  'Score': number;
  /** The Share */
  'Share': number;
}
