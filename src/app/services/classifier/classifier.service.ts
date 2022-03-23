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
// import { Accomplishment } from '../../classes/accomplishment/accomplishment';
import { Accomplishment } from '../../interfaces/cv/accomplishment';
import { ClassifierKind } from '../../enums/classifier-kind.enum';
import { OntologyEntry } from '../../interfaces/ontology-entry/ontology-entry';

// import { Ontology } from '../../classes/ontology/ontology';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { OntologyService } from '../ontology/ontology.service';
// import { CountCacheService } from '../count-cache/count-cache.service';
// import { UiService } from '../ui/ui.service';
// import { EngineService } from '../engine/engine.service';

// import { PortfolioModel } from '../../model/portfolio/portfolio.model';

import { Go } from '../../enums/go.enum';

/**
 * Classifier connection service.
 */
@Injectable({
  providedIn: 'root'
})
export class ClassifierService extends ClassifiableService {
  // /** Instance */
  // private static sInstance: ClassifierService;
  // /** Instance getter */
  // public static get instance(): ClassifierService { return this.sInstance; }

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
   * @param persistenceService The persistence service injected dependency.
   * @param ontologyService The ontology service injected dependency.
   */
  constructor(
    // private readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
    public readonly ontologyService: OntologyService,
    // private readonly countCacheService: CountCacheService,
    // private readonly engine: EngineService,
    // public readonly classifierService: ClassifierService,
    // private readonly portfolioModel: PortfolioModel,
  ) {
    // ClassifierService.sInstance = classifierService;
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
   *
   * @returns whether accomplishment is of proper category.
   */
  // eslint-disable-next-line complexity, max-lines-per-function
  protected override isOfProperCategory = (
    accomplishment: Accomplishment, accomplishmentType: string, predicate?: (_: Accomplishment) => boolean
  ) => {
    // const ontology = this.portfolioModel.ontology;
    const ontology = this.ontologyService.ontology;
    // // console.log(`Classifier: isOfProperCategory: ontology: ${JSON.stringify(this.ontologyService.ontology)}`);
    // // console.log(`Classifier: isOfProperCategory: ontology.length: ${ontology.length}`);
    // // console.log(`isOfProperCategory: 1: accomplishmentType: ${accomplishmentType}`);
    // if (!ontology) { return false; }
    // // console.log(`isOfProperCategory: 2: accomplishmentType: ${accomplishmentType}`);

    switch (this.classifierKind) {
      // case ClassifierKind.Classic: return predicate(accomplishment);
      case ClassifierKind.Direct: return this.isOfType(accomplishment, accomplishmentType);
      default: /* empty: continue */
    }
    // console.log(`isOfProperCategory: 3: accomplishmentType: ${accomplishmentType}`);
    // console.log(`isOfProperCategory: ontology.entries: ${JSON.stringify(this.ontologyService.ontology.entries)}`);

    const ontologyEntry = ontology.find((_) => _.Entity === accomplishment.Platform) as OntologyEntry;
    // console.log(`isOfProperCategory: 4: accomplishmentType: ${accomplishmentType}`);
    switch (this.classifierKind) {
      case ClassifierKind.Explicit: return accomplishmentType === accomplishment.Platform;
      case ClassifierKind.Strong: return ontologyEntry?.category === accomplishmentType;
      case ClassifierKind.Medium: return ontologyEntry?.path.includes(accomplishmentType);
      case ClassifierKind.Weak: return ontologyEntry?.displayPath.includes(accomplishmentType);
      default: return false;
    }
    // tslint:disable-next-line: semicolon
  };

  // /**
  //  * Whether accomplishment is of type organization.
  //  *
  //  * @param accomplishment The accomplishment to test.
  //  *
  //  * @returns whether accomplishment is of type organization.
  //  */
  // // eslint-disable-next-line complexity
  // public isOrganization(accomplishment: Accomplishment): boolean {
  //   switch (this.classifierKind) {
  //     case ClassifierKind.Strong:
  //     case ClassifierKind.Medium:
  //     case ClassifierKind.Weak:
  //       return this.isOfProperCategory(accomplishment, 'Organization', this.isOrganization);

  //     case ClassifierKind.Classic:
  //       return ['Conference', 'Eventbrite', 'Meetup', 'Club'].includes(accomplishment.Type);

  //     case ClassifierKind.ClassicDirect:
  //       return this.isOfType(accomplishment, 'Organization');

  //     default:
  //       return false;
  //   }
  // }

  // /**
  //  * Rotate classifier kind changer.
  //  *
  //  * @param event The initiating click event.
  //  */
  // // eslint-disable-next-line max-lines-per-function, complexity
  // public rotateClassifierKind(event: MouseEvent) {
  //   // const target = event.target as HTMLElement;
  //   // const currentTarget = event.currentTarget as HTMLElement;
  //   // if (!target.title.includes(this.uiService.uiText('classification method'))) { return; }
  //   // console.log(`ClassifierComponent: -1: rotateClassifierKind: ${target.innerHTML.trim()}, `
  //   //   + `this.classifierKind: ${this.classifierKind}, currentTarget.classList: ${currentTarget.classList}, `
  //   //   + `target.classList: ${target.classList}, target.className: ${target.className}`);
  //   // if (!(
  //   //   target.classList.contains('classifier')
  //   //   || target.classList.contains('clickableClassifierKind')
  //   //   || target.parentElement?.classList.contains('clickableClassifierKind')
  //   //   || target.parentElement?.parentElement?.classList.contains('clickableClassifierKind')
  //   // )) { return; }

  //   // console.log(`ClassifierComponent: 0: rotateClassifierKind: ${target.innerHTML.trim()}, `
  //   //   + `this.classifierKind: ${this.classifierKind}, currentTarget.classList: ${currentTarget.classList}, `
  //   //   + `target.classList: ${target.classList}, target.className: ${target.className}`);
  //   // this.classifierKind = this.classifierKind + 1;
  //   // if (this.classifierKind === this.ClassifierKindValues.length) {
  //   //   this.classifierKind = 0;
  //   // }
  //   this.next(event);
  //   // console.log(`ClassifierComponent: 1: rotateClassifierKind: ${target.innerHTML.trim()}, `
  //   //   + `this.classifierKind: ${this.classifierKind}, currentTarget.classList: ${currentTarget.classList}, `
  //   //   + `target.classList: ${target.classList}, target.className: ${target.className}`);

  //   // const accomplishments = this.portfolioModel.filtered?.Accomplishments;
  //   // // console.log(`ClassifierComponent: 2: rotateClassifierKind: ${target.innerHTML.trim()}, `
  //   // //   + `this.classifierKind: ${this.classifierKind}, currentTarget.classList: ${currentTarget.classList}, `
  //   // //   + `target.classList: ${target.classList}, target.className: ${target.className}`);
  //   // if (accomplishments) {
  //   //   this.portfolioModel.cv.Courses = accomplishments;
  //   //   this.portfolioModel.filtered.Accomplishments = accomplishments;
  //   // }
  //   // // console.log(`ClassifierComponent: 3: rotateClassifierKind: ${target.innerHTML.trim()}, `
  //   // //   + `this.classifierKind: ${this.classifierKind}, currentTarget.classList: ${currentTarget.classList}, `
  //   // //   + `target.classList: ${target.classList}, target.className: ${target.className}`);

  //   // this.ontologyService.ontologyAdjusterService.adjustOntology();
  //   // // eslint-disable-next-line max-len
  //   // // console.log(`ClassifierComponent: 4: rotateClassifierKind: ${target.innerHTML.trim()}, `
  //   // //   + `this.classifierKind: ${this.classifierKind}, currentTarget.classList: ${currentTarget.classList}, `
  //   // //   + `target.classList: ${target.classList}, target.className: ${target.className}`);

  //   event.stopPropagation();
  // }

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
      // this.uiService.uiText('Click here to change classification method from'),
      'Click here to change classification method from',

      ClassifierKind[this.classifierKind].toLowerCase(),

      // this.uiService.uiText('to'),
      'to',

      ClassifierKind[nextPotentialField.classifierKind].toLowerCase(),
    ];
    return tokens.join(' ');
  }
}
