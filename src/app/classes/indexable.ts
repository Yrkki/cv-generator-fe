import { Indexable as IIndexable } from '../interfaces/indexable';

/**
 * Indexable class.
 * ~implements {@link IIndexable}
 */
export class Indexable<T = any> implements IIndexable<T> {
  /**
   * Indexer.
   * ~override
   */
  // eslint-disable-next-line no-undef
  [index: string]: T;
}
