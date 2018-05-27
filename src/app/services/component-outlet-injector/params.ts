import { Injectable } from '@angular/core';

/**
 * Injector params structure.
 * */
@Injectable()
export class Params {
    /** Propety name in question */
    propertyName: string;
    /** Indexer when part of a collection */
    i: number;
}
