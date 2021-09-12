// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Indexable } from '../../classes/indexable';

/**
 * Hue, saturation, lightness and alpha based color structure.
 * ~extends {@link Indexable}
 */
export class HSLA extends Indexable {
    /** Hue. */
    h: any;
    /** Saturation. */
    s: any;
    /** Lightness. */
    l: any;
    /** Alpha. */
    a: any;
}
