import { Injectable } from '@angular/core';
import { Indexable } from '../../classes/indexable';

/**
 * Storage mechanism implementation.
 *
 * This Web Storage API interface provides access to a particular domain's session or local storage.
 * It allows, for example, the addition, modification, or deletion of stored data items.
 *
 * ~extends {@link Indexable}
 * ~implements {@link Storage}
 */
@Injectable({
  providedIn: 'root'
})
export class StorageMechanism extends Indexable implements Storage {
  /**
   * Returns the number of key/value pairs currently present in the list associated with the object.
   * ~override
   */
  get length(): number { return localStorage.length; }

  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   * ~override
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * Returns the current value associated with the given key, or null if the given key does not exist
   * in the list associated with the object.
   * ~override
   * @param key The item key.
   */
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * Returns the name of the nth key in the list, or null if n is greater than or equal to the number of
   * key/value pairs in the object.
   * ~override
   * @param index The item index.
   */
  key(index: number): string | null {
    return localStorage.key(index);
  }

  /**
   * Removes the key/value pair with the given key from the list associated with the object,
   * if a key/value pair with the given key exists.
   * ~override
   * @param key The item key.
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set.
   * (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   *
   * ~override
   * @param key The item key.
   * @param value The item value.
   */
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
