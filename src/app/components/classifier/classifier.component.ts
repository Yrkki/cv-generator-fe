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

import { ClassifierService } from '../../services/classifier/classifier.service';
import { ClassifierKind } from '../../enums/classifier-kind.enum';
import { Go } from '../../enums/go.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { ToggleComponent } from '../toggle/toggle.component';

/**
 * Classifier component
 */
@Component({
  selector: 'app-classifier',
  templateUrl: './classifier.component.html',
  styleUrls: ['./classifier.component.scss']
})
export class ClassifierComponent {
  /** The classifier component target type. */
  @Input() type = '';

  /** The classifier component display type. */
  public get displayType() { return this.portfolioService.model.portfolioModel.entities[this.type]?.section || this.type; }

  /** Subcomponent. */
  // eslint-disable-next-line max-lines-per-function
  public get subComponent() {
    return {
      /** The proper classifier service to use. */
      classifierService: this.classifierService,
      /** The proper portfolio service to use. */
      portfolioService: this.portfolioService,
      /** Subservice getter delegate. */
      get subService() { return this.classifierService.subService; },

      /** Display value getter. */
      get displayValue() { return `${ClassifierKind[this.classifierService.classifierKind].toLowerCase()}`; },

      /** Next home getter. */
      get nextHome() { return this.subService.nextDirection[Go.Home]; },
      /** Next back getter. */
      get nextBack() { return this.subService.nextDirection[Go.Back]; },
      /** Next forward getter. */
      get nextForward() { return this.subService.nextDirection[Go.Forward]; },

      /** Next delegate. */
      next(event: MouseEvent, classifierKindNext = Go.Forward) {
        this.portfolioService.engine.ReclassifyAccomplishments(event, classifierKindNext);
      },
      /** Next title delegate. */
      nextTitle(classifierKindNext = Go.Forward) { return this.classifierService.nextTitle(classifierKindNext); },
    };
  }

  /** A clickable back element. */
  @ViewChild('clickableBack') clickableBack!: ElementRef<HTMLSpanElement>;
  /** A clickable forward element. */
  @ViewChild('clickableForward') clickableForward!: ElementRef<HTMLSpanElement>;
  /** A clickable home element. */
  @ViewChild('clickableHome') clickableHome!: ElementRef<HTMLSpanElement>;

  /** Go enum accessor. */
  public get Go() { return Go; }

  /** The toggle entity key */
  public toggleEntityKey = 'Classifier';

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Whether toolbar collapsed toggle is checked. */
  public get toolbarCollapsedToggleChecked() { return this.toolbarCollapsedToggle?.inputToggle?.nativeElement?.checked; }

  /** Toolbar collapsed toggle element. */
  @ViewChild('toolbarCollapsedToggle') toolbarCollapsedToggle!: ToggleComponent;

  /**
   * Constructs the classifier component.
   * ~constructor
   *
   * @param classifierService The classifier service injected dependency.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    public readonly classifierService: ClassifierService,
    public readonly portfolioService: PortfolioService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
  ) {
  }
}
