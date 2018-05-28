import { Injectable } from '@angular/core';

/**
 * Injector parameters structure.
 */
@Injectable()
export class Params {
    /** Propety name */
    propertyName: string;
    /** Index when part of a collection */
    i: number;
}
