import { Indexable } from '../indexable';

/**
 * Context interface.
 * ~extends {@link Indexable}
 */
export interface Context extends Indexable {
  /** The Id */
  id: number;
  /** The Name */
  name: string;
  /** The Storage */
  storage: Storage;
}
