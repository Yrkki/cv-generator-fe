// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { ClassifiableService } from '../classifiable/classifiable.service';
import { Injectable } from '@angular/core';
import { Accomplishment } from '../../interfaces/cv/accomplishment';
import { ClassifierKind } from '../../enums/classifier-kind.enum';
import { OntologyEntry } from '../../interfaces/ontology-entry/ontology-entry';

import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { OntologyService } from '../ontology/ontology.service';

import { Go } from '../../enums/go.enum';

/**
 * Classifier connection service.
 */
@Injectable({
  providedIn: 'root'
})
export class ClassifierService extends ClassifiableService {
  /** ClassifierKind values getter. */
  public get ClassifierKindValues() {
    return Object.values(ClassifierKind).filter((_) => !isNaN(Number(_))) as ClassifierKind[];
  }

  /** Subservice. */
  public get subService() {
    return {
      /** Classifier kind. */
      classifierKind: this.classifierKind,
      /** Defaults. */
      defaultKind: ClassifierKind.Strong,
      /** Prefix for fully qualified names, getter. */
      get prefix() { return 'classifier'; },
      /** Fully qualified name, used to prefix other identifiers, getter. */
      get full() { return this.prefix + ClassifierKind[this.classifierKind]; },
      /** Persistence name getter. */
      get sFull() { return this.full + 's'; },
      /** Index name getter. */
      get indexFull() { return this.full + 'Index'; },
      /** Next direction getter. */
      get nextDirection() { return ['ᐸᐸ', 'ᐸ', 'ᐳ']; },
    };
  }

  /**
   * Constructs the classifier service.
   * ~constructor
   *
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param ontologyService The ontology service injected dependency.
   */
  constructor(
    public readonly uiService: UiService,
    public override readonly persistenceService: PersistenceService,
    public readonly ontologyService: OntologyService,
  ) {
    super(persistenceService);
  }

  /**
   * Whether accomplishment is of type specified.
   *
   * @param accomplishment The accomplishment to test.
   * @param accomplishmentType The accomplishment type to test.
   *
   * @returns whether accomplishment is of the type specified.
   */
  public isOfType(accomplishment: Accomplishment, accomplishmentType: string): boolean {
    return accomplishment.Type === accomplishmentType;
  }

  /**
   * Whether accomplishment is of proper category.
   *
   * @param accomplishment The accomplishment to test.
   * @param accomplishmentType The accomplishment type to test.
   *//**
* @deprecated predicate The accomplishment type to test.
* @param accomplishment The accomplishment to test.
* @param accomplishmentType The accomplishment type to test.
* @param predicate The accomplishment kind predicate to use in case used with ClassifierKind.Classic.
*
* @returns whether accomplishment is of proper category.
*/
  // eslint-disable-next-line complexity
  protected override isOfProperCategory = (
    accomplishment: Accomplishment, accomplishmentType: string, _predicate?: (_: Accomplishment) => boolean
  ) => {
    const ontology = this.ontologyService.ontology;

    if (this.classifierKind === ClassifierKind.Direct) {
      return this.isOfType(accomplishment, accomplishmentType);
    }
    const ontologyEntry = ontology.find((_) => _.Entity === accomplishment.Platform) as OntologyEntry;
    switch (this.classifierKind) {
      case ClassifierKind.Explicit: return accomplishmentType === accomplishment.Platform;
      case ClassifierKind.Strong: return ontologyEntry?.category === accomplishmentType;
      case ClassifierKind.Medium: return ontologyEntry?.path.includes(accomplishmentType);
      case ClassifierKind.Weak: return ontologyEntry?.displayPath.includes(accomplishmentType);
      default: return false;
    }
    // tslint:disable-next-line: semicolon
  };

  /** Floored division modulo operation getter. */
  private clamp(n: number, m: number) {
    if (m === 0) { return n; }

    const d = n % m;
    return d < 0 ? d + m : d;
  }

  /** Next potential field. */
  private nextPotentialField(classifierKind: number, classifierKindNext = Go.Forward) {
    if (classifierKindNext === Go.Home) {
      classifierKind = this.subService.defaultKind;
    } else {
      const nudgedPotentialField = this.nudgePotentialField(classifierKind, classifierKindNext);
      classifierKind = nudgedPotentialField.classifierKind;
    }
    classifierKind = this.clamp(classifierKind, this.ClassifierKindValues.length);
    return { classifierKind };
  }

  /** Nudge potential field to next adjacent one, raw. */
  private nudgePotentialField(classifierKind: number, classifierKindNext = Go.Forward) {
    if (classifierKindNext === Go.Back) {
      classifierKind--;
    } else if (classifierKindNext === Go.Forward) {
      classifierKind++;
    }
    return { classifierKind };
  }

  /** Next. */
  public next(event: MouseEvent, classifierKindNext = Go.Forward) {
    const nextPotentialField = this.nextPotentialField(this.classifierKind, classifierKindNext);
    this.classifierKind = nextPotentialField.classifierKind;
    event.stopPropagation();
  }

  /** Next title. */
  public nextTitle(classifierKindNext = Go.Forward) {
    const nextPotentialField = this.nextPotentialField(this.classifierKind, classifierKindNext);
    const tokens = [
      this.uiService.uiText('Click here to change classification method from'),
      ClassifierKind[this.classifierKind].toLowerCase(),
      this.uiService.uiText('to'),
      ClassifierKind[nextPotentialField.classifierKind].toLowerCase(),
    ];
    return tokens.join(' ');
  }
}
