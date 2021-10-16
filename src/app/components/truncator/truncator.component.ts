// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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
import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';

import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';

import { ToggleKind } from '../../enums/toggle-kind.enum';
import { ToggleComponent } from '../toggle/toggle.component';
import { ToggleService } from '../../services/toggle/toggle.service';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';

/**
 * Truncator component
 */
@Component({
  selector: 'app-truncator',
  templateUrl: './truncator.component.html',
  styleUrls: ['./truncator.component.scss']
})
export class TruncatorComponent {
  /** Context. */
  @Input() public context?: {
    value?: string;
    displayValue?: string;
    model?: number;
    propertyName?: string;
  };

  /** The truncator kind. */
  #truncatorKind!: TruncatorKind;
  /** Truncator kind getter. */
  public get truncatorKind() {
    return this.#truncatorKind;
  }
  /** Truncator kind setter. */
  @Input() public set truncatorKind(value) {
    if (this.#truncatorKind !== value) {
      this.#truncatorKind = value;

      // initialize the truncatorService
      this.Initialize();
    }
  }

  /** The proper truncator service to use. */
  public truncatorService?: TruncatorService;

  /** Context subcomponent. */
  // eslint-disable-next-line max-lines-per-function
  public get subContext() {
    return {
      /** The proper truncator service to use. */
      truncatorService: this.truncatorService,

      /** Long truncator kind. */
      longTruncatorKind: this.longTruncatorKind,
      /** Context. */
      context: this.context,

      /** Focus threshold value. */
      get value() { return this.context?.value ?? `${this.longTruncatorKind} ${this.displayValue}`; },
      /** Focus threshold display value. */
      get displayValue() { return this.context?.displayValue ?? TruncatorService.focusThresholdDisplayValue; },
      /** Model getter. */
      get model() {
        return this.context?.model ?? this.truncatorService?.FocusThreshold
          ?? TruncatorService.focusThresholdDefaults.get(TruncatorKind.Cv)
          ?? 20;
      },
      /** Focus threshold property name. */
      get propertyName() { return this.context?.propertyName ?? TruncatorService.focusThresholdPropertyName; },

      /** Tag cloud emphasis context. */
      get tagCloudEmphasisContext() {
        return {
          position: '',
          value: `${this.longTruncatorKind} ${ToggleService.displayValues.get(ToggleKind.TagCloudEmphasis)}`,
          displayValue: ToggleService.displayValues.get(ToggleKind.TagCloudEmphasis),
          model: this.truncatorService?.TagCloudEmphasis,
          subject: this.truncatorService,
          propertyName: 'TagCloudEmphasis',
          sliderClass: 'slider-cyan'
        };
      }
    };
  }

  /** Truncator kind enum accessor. */
  public get TruncatorKind() { return TruncatorKind; }
  /** Long truncator kind. */
  public get longTruncatorKind() {
    return this.truncatorKind === TruncatorKind.Cv ? this.portfolioService.model.portfolioModel.entities['Curriculum Vitae']?.section
      : this.truncatorKind === TruncatorKind.Ps ? this.portfolioService.model.portfolioModel.entities['Project Summary']?.section
        : this.truncatorKind === TruncatorKind.Pp ? this.portfolioService.model.portfolioModel.entities['Project Portfolio']?.section
          : '';
  }

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Focus threshold clickable element. */
  @ViewChild('clickableFocusThreshold') clickableFocusThreshold!: ElementRef<HTMLSpanElement>;
  /** Focus threshold input element. */
  @ViewChild('inputFocusThreshold') inputFocusThreshold!: ElementRef<HTMLInputElement>;
  /** The tag cloud emphasis toggle element. */
  @ViewChild('tagCloudEmphasisToggle') tagCloudEmphasisToggle!: ToggleComponent;

  /**
   * Constructs the truncator component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Cv)) private readonly truncatorServiceCv: TruncatorService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Ps)) private readonly truncatorServicePs: TruncatorService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Pp)) private readonly truncatorServicePp: TruncatorService,
    public readonly portfolioService: PortfolioService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
  ) {
  }

  /** Initialization */
  Initialize() {
    switch (this.truncatorKind) {
      case TruncatorKind.Cv: this.truncatorService = this.truncatorServiceCv; break;
      case TruncatorKind.Ps: this.truncatorService = this.truncatorServicePs; break;
      case TruncatorKind.Pp: this.truncatorService = this.truncatorServicePp; break;
    }
  }
}
