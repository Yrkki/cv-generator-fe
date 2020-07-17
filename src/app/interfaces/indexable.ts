/** Indexable interface. */
export interface Indexable<T = any> {
  /** Indexer. */
  [index: string]: T;
}
