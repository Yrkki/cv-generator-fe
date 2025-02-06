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
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

/**
 * Selector header component
 * ~extends {@link PropertyComponent}
 * ~implements {@link AfterViewInit}
 */
@Component({
  standalone: false,
  selector: 'app-selector-header',
  templateUrl: './selector-header.component.html',
  styleUrls: ['./selector-header.component.scss']
})
export class SelectorHeaderComponent extends PropertyComponent implements AfterViewInit, AfterContentChecked {
  /** The component key */
  #key = 'key';
  /** The component key getter */
  public get key() { return this.#key; }
  /** The component key setter */
  @Input() public set key(value) { this.#key = value?.substring(0, 50) ?? ''; }

  /** The inline predicate */
  #inline = false;
  /** The inline predicate getter */
  public get inline() { return this.#inline; }
  /** The inline predicate setter */
  @Input() public set inline(value) { this.#inline = value; }

  /** The divider predicate */
  #divider = false;
  /** The divider predicate getter */
  public get divider() { return this.#divider; }

  /** Divider present getter */
  private get dividerPresent() {
    if (!this.inline) { return false; }

    const clickableNativeElement = this.clickable?.nativeElement;
    if (!clickableNativeElement) { return false; }

    if (!this.useDivider(clickableNativeElement)) { return false; }

    const contentLength = clickableNativeElement.textContent?.trim().length || 0;
    return contentLength > 0;
  }

  /** Clickable element. */
  @ViewChild('clickable') clickable?: ElementRef<HTMLDivElement>;

  /**
   * Constructs the Professional experience component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param toolbarService The toolbar service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param changeDetector The base class that provides change detection functionality.
   */
  constructor(
    public override readonly portfolioService: PortfolioService,
    public readonly toolbarService: ToolbarService,
    public override readonly inputService: InputService,
    public override readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
    public override readonly dataService: DataService,
    public override readonly excelDateFormatterService: ExcelDateFormatterService,
    private readonly changeDetector: ChangeDetectorRef,
  ) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService);
  }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    this.persistenceService.restoreToggle(document, this.key, this.key);
  }

  /** Co-initialization. Trigger divider visibility changes. */
  ngAfterContentChecked(): void {
    this.#divider = this.dividerPresent;
    this.changeDetector.detectChanges();
  }

  /**
   * Processes the click event.
   *
   * @param event The click event handler.
   */
  public onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement
      || targetElement.tagName === 'A'
      // tslint:disable-next-line: no-non-null-assertion
      || targetElement.parentElement!.parentElement!.parentElement!.tagName === 'APP-CATEGORY') { return; }

    event.stopPropagation();
    this.persistenceService.saveToggle(event);
  }

  /**
   * Use divider.
   *
   * @param element The element.
   */
  // eslint-disable-next-line complexity
  private useDivider(element: Element) {
    // tslint:disable-next-line: no-non-null-assertion
    const parentElement = element.parentElement;
    if (!parentElement) { return true; }

    if (this.toolbarService.editMode) {
      if (parentElement === parentElement.parentElement?.firstElementChild) { return false; }
    } else {
      const siblings = parentElement.parentElement?.children;
      if (siblings &&
        parentElement === Array.from(siblings).find((value) => this.notCollapsed(value))) { return false; }
    }

    return true;
  }

  /**
   * Check if element is not blank or collapsed.
   *
   * @param element The element.
   */
  private notCollapsed(element: Element) {
    const subElement = element.children?.[0];
    const contentLength = subElement?.textContent?.trim().length || 0;

    return contentLength > 0
      && !subElement.classList.contains('collapsed');
  }
}
