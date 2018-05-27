import { Injectable } from '@angular/core';

/** Type decorator */
@Injectable()
/** Injector params structure. */
export class Params {
    /** Propety name in question */
    propertyName: string;
    /** Indexer when part of a collection */
    i: number;
}
