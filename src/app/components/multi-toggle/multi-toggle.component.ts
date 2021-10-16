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
import { Component, ElementRef, ViewChild } from '@angular/core';

import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';

/**
 * MultiToggle component
 */
@Component({
  selector: 'app-multi-toggle',
  templateUrl: './multi-toggle.component.html',
  styleUrls: ['./multi-toggle.component.scss']
})
export class MultiToggleComponent {
  /** Tag cloud display mode enum accessor. */
  public get TagCloudDisplayMode() { return TagCloudDisplayMode; }

  /** Mode decorated clickable element. */
  @ViewChild('clickableModeDecorated') clickableModeDecorated?: ElementRef<HTMLSpanElement>;
  /** The tag cloud element. */
  @ViewChild('tagCloudElement') tagCloudElement?: ElementRef<HTMLInputElement>;
  /** The chart tag cloud element. */
  @ViewChild('chartElement') chartElement?: ElementRef<HTMLInputElement>;
  /** The both tag cloud element. */
  @ViewChild('bothElement') bothElement?: ElementRef<HTMLInputElement>;

  /** Mode clickable element. */
  @ViewChild('clickableMode') clickableMode?: ElementRef<HTMLSpanElement>;
  /** Tag cloud clickable element. */
  @ViewChild('clickableTagCloud') clickableTagCloud?: ElementRef<HTMLLabelElement>;
  /** Chart clickable element. */
  @ViewChild('clickableChart') clickableChart?: ElementRef<HTMLLabelElement>;
  /** Both clickable element. */
  @ViewChild('clickableBoth') clickableBoth?: ElementRef<HTMLLabelElement>;

  /**
   * Constructs the multitoggle component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
  ) {
  }
}
