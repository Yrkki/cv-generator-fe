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
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';

import { Accomplishment } from '../../classes/accomplishment/accomplishment';
import { OntologyAdjusterService } from '../../services/ontology-adjuster/ontology-adjuster.service';
import { ClassifierService } from '../../services/classifier/classifier.service';
import { ClassifierKind } from '../../enums/classifier-kind.enum';

/**
 * Category component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  /** Injected category. */
  @Input() public propertyName!: Accomplishment;

  // /** The current ontology old switch. */
  // #ontologySwitchOld = '';
  // /** The current ontology old switch getter. */
  // private get OntologySwitchOld() { return this.#ontologySwitchOld; }

  // /** The current ontology switch. */
  // #ontologySwitch = this.propertyName.Platform;
  // /** The current ontology switch getter. */
  // private get OntologySwitch() { return this.#ontologySwitch; }
  // /** The current ontology switch setter. */
  // private set OntologySwitch(value) { this.#ontologySwitchOld = this.#ontologySwitch; this.#ontologySwitch = value; }

  /** The property ontology entry class calculated. */
  public get ontologyParents() {
    const ontologyEntry = this.ontologyEntry;
    if (!ontologyEntry) { return []; }

    // const ontologyParents = this.ontologyEntry.multiParents.filter((f) => f !== this.OntologySwitch);
    // if (this.#ontologySwitchOld) { ontologyParents.push(this.#ontologySwitchOld); }
    const ontologyParents =
      // [this.ontologyEntry.Entity, ...this.ontologyEntry.multiParents].filter((f) => f !== this.ontologyEntry?.selectedParent);
      this.multiParents.filter((f) => f !== ontologyEntry.selectedParent);
    // this.ontologyEntry.multiParents;
    // if (this.#ontologySwitchOld) { ontologyParents.push(this.#ontologySwitchOld); }

    return ontologyParents;
  }

  /** The property ontology entry class calculated. */
  public get ontologyEntry() {
    // return this.classifierService.ontologyService.ontology.find((_) => _.Entity === this.OntologySwitch);
    return this.classifierService.ontologyService.ontology.find((_) => _.Entity === this.propertyName.Platform);
  }

  // /** The property selected ontology entry class calculated. */
  // private get selectedOntologyEntry() {
  //   return this.classifierService.ontologyService.ontology.find((_) => _.Entity === this.ontologyEntry?.selectedParent);
  // }

  /** The property platform. */
  public get platform() { return this.ontologyEntry?.displayPath ?? ''; }

  /** The multi-parents. */
  private get multiParents() { return this.ontologyEntry?.multiParents ?? []; }

  /** The property category. */
  public get category() { return this.ontologyEntry?.category ?? ''; }

  /** The property color. */
  public get ontologyColor() { return this.ontologyEntry?.Color ?? 'grey'; }

  /** The property color. */
  public get color() {
    return this.propertyName.Color;
  }

  public get ClassifierKind() { return ClassifierKind; }

  /** The platformVisible. */
  public get platformVisible() {
    return this.portfolioService.toolbarService.editMode || this.classifierService.classifierKind !== ClassifierKind.Classic;
  }

  /** The typeVisible. */
  // eslint-disable-next-line complexity
  public get typeVisible() {
    return (this.portfolioService.toolbarService.editMode && this.propertyName.Type !== this.propertyName.Platform)
      || (this.classifierService.classifierKind === ClassifierKind.Classic
        && this.propertyName.Type !== (this.propertyName['Certificate logo']
          || this.propertyName['Certificate tag'] ? 'Certification' : 'Category'));
  }

  /** The colorVisible. */
  public get colorVisible() { return this.portfolioService.toolbarService.editMode && this.color !== this.ontologyColor; }

  /** Classifier Kind clickable element. */
  @ViewChild('clickableClassifierKind') clickableClassifierKind?: ElementRef<HTMLSpanElement>;
  /** Change Ontology Structure clickable element. */
  @ViewChild('clickableChangeOntologyStructure') clickableChangeOntologyStructure?: ElementRef<HTMLSpanElement>;

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /**
   * Constructs the Category component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param ontologyAdjusterService The ontology adjuster service injected dependency.
   * @param classifierService The classifier service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    private readonly ontologyAdjusterService: OntologyAdjusterService,
    public readonly classifierService: ClassifierService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
  ) {
  }

  /** Ontology entry property. */
  public getOntologyEntryProperty(entity: string, property: string) {
    return this.classifierService.ontologyService.ontology.find((_) => _.Entity === entity)?.[property];
  }

  // /** Rotate classifier kind changer delegate. */
  // public rotateClassifierKind(event: MouseEvent) {
  //   this.classifierService.rotateClassifierKind(event);
  //   this.portfolioService.engine.filterService.searchTokenChangeHandler();
  // }

  /** Change ontology structure. */
  public onMouseEnter(event: MouseEvent) {
    if (!this.ontologyEntry) { return; }
    const target = event.target as HTMLSpanElement;
    if (!target) { return; }

    const targetParent = target.innerHTML.trim();
    target.title = this.uiService.uiText(
      `Click here to change ontology structure from ${this.ontologyEntry.selectedParent} to ${targetParent}`);

    event.stopPropagation();
  }

  /** Next title delegate. */
  public nextTitle() { return this.classifierService.nextTitle(); }

  /** Change ontology structure. */
  public changeOntologyStructure(event: MouseEvent) {
    if (!this.ontologyEntry) { return; }
    const target = event.target as HTMLSpanElement;
    if (!target) { return; }

    this.ontologyEntry.selectedParent = target.innerHTML.trim();

    // const startTimeRecalculateOntology = Date.now();
    this.ontologyAdjusterService.recalculateOntology();

    // const startTimeSearchTokenChangeHandler = Date.now();
    this.portfolioService.engine.filterService.searchTokenChangeHandler();

    // const startTimeReport = Date.now();
    // console.log(
    //   `OntologyComponent: recalculateOntology: ${(startTimeSearchTokenChangeHandler - startTimeRecalculateOntology).toLocaleString()
    //   } searchTokenChangeHandler: ${(startTimeReport - startTimeSearchTokenChangeHandler).toLocaleString()
    //   }`
    // );

    event.stopPropagation();
  }
}
