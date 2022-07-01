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
import { Injectable } from '@angular/core';
import { OntologyEntry } from '../../interfaces/ontology-entry/ontology-entry';
import { Ontology } from '../../classes/ontology/ontology';

/**
 * OntologyAdjuster connection service.
 */
@Injectable({
  providedIn: 'root'
})
export class OntologyAdjusterService {
  /** separator */
  private readonly separator = ' ❯❯ ';

  /** Ontology data. */
  public ontology = new Ontology();

  /**
   * Constructs the ontology adjuster service.
   * ~constructor
   *
   */
  constructor(
  ) {
  }

  /** Adjusts the ontology. */
  public adjustOntology() {
    if (!this.ontology.core) {
      this.ontology.core = this.ontology.filter((_) => _.Color.length > 0);
    }

    for (const ontologyEntry of this.ontology) {
      this.trimOntologyEntry(ontologyEntry);

      // or retrieve from persistence
      ontologyEntry.selectedParent = ontologyEntry.Parent;
    }

    this.recalculateOntology();
  }

  /** Recalculate the ontology. */
  public recalculateOntology() {
    const startTime = Date.now();

    for (const ontologyEntry of this.ontology) {
      this.trimOntologyEntry(ontologyEntry);

      const path = this.calculatePath(ontologyEntry);
      ontologyEntry.path = path;
      ontologyEntry.displayPath = path.join(this.separator);

      ontologyEntry.multiParents =
        [ontologyEntry.Parent, ...ontologyEntry.MultiParent.split(',').map((_) => _.trim()).filter((f) => f.length > 0)];
      // ontologyEntry.multiPaths = [];
      // // ontologyEntry.displayMultiPaths = [];
      // ontologyEntry.multiParents.forEach((multiParent) => {
      //   const multiParentOntologyEntry = this.ontology.find((_) => _.Entity === multiParent);

      //   const multiPath = this.adjustPath(multiParentOntologyEntry);
      //   ontologyEntry.multiPaths.push(multiPath);
      //   // ontologyEntry.displayMultiPaths.push(multiPath.join(this.separator));
      // });
    }

    // console.log(`OntologyComponent: recalculateOntology: ${(Date.now() - startTime).toLocaleString()}`);
  }

  /** Calculate the ontology. */
  // eslint-disable-next-line max-lines-per-function, complexity
  public calculatePath(ontologyEntry?: OntologyEntry) {
    // const this.ontology = this.ontology;
    const path = [];

    let nextOntologyEntry: OntologyEntry | undefined = ontologyEntry;
    while (
      typeof nextOntologyEntry !== 'undefined'
      && path.length < 20
    ) {
      path.push(nextOntologyEntry.Entity);

      // if (nextOntologyEntry.Entity.includes('Training') || nextOntologyEntry.Entity.includes('Hobby')) {
      //   console.log(`OntologyComponent: calculatePath: ${nextOntologyEntry.Entity} `
      //     + `core!.includes: ${this.ontology.core!.includes(nextOntologyEntry)} `
      //     + `nextOntologyEntry!.selectedParent: ${nextOntologyEntry!.selectedParent}`);
      // }

      // tslint:disable-next-line: no-non-null-assertion
      if (this.ontology.core!.includes(nextOntologyEntry)) {
        // if (nextOntologyEntry) {
        if (ontologyEntry) {
          ontologyEntry.Color = nextOntologyEntry.Color;
          ontologyEntry.category = nextOntologyEntry.Entity;
        }
        break;
      }

      // tslint:disable-next-line: no-non-null-assertion
      nextOntologyEntry = this.ontology.find((_) => _.Entity === nextOntologyEntry!.selectedParent);
    }

    return path.slice(0);
    // ontologyEntry.path = path.slice(0);
    // ontologyEntry.displayPath = path.join(this.separator);
  }

  /**
   * Trims the ontology entry data.
   *
   * @param ontologyEntry The ontology entry.
   */
  private trimOntologyEntry(ontologyEntry: OntologyEntry) {
    if (ontologyEntry.Entity) { ontologyEntry.Entity = ontologyEntry.Entity.trim(); }
    if (ontologyEntry.Parent) { ontologyEntry.Parent = ontologyEntry.Parent.trim(); }
    if (ontologyEntry.Color) { ontologyEntry.Color = ontologyEntry.Color.trim(); }
    // if (ontologyEntry.MultiParent) { ontologyEntry.MultiParent = ontologyEntry.MultiParent.map((_) => _?.trim() ?? _); }
  }
}
