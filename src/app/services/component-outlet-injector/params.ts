import { Injectable } from '@angular/core';
import { Indexable } from '../../interfaces/indexable';

/**
 * Injector parameters structure.
 */
@Injectable({
  providedIn: 'root'
})
export class Params {
    /** Propety name */
    public propertyName: Indexable = {};

    /** Index when part of a collection */
    public i = -1;
}
