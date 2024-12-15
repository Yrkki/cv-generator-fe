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
import { Component, ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';

import { Context } from '../../interfaces/context/context';
import { NavState } from '../../enums/nav-state';

import { ContextService } from '../../services/context/context.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

/**
 * Context switcher "nav" component
 * ~implements {@link AfterViewInit}
 */
@Component({
  standalone:false,
  selector: 'app-context-switcher',
  templateUrl: './context-switcher.component.html',
  styleUrls: ['./context-switcher.component.scss']
})
export class ContextSwitcherComponent implements AfterViewInit {
  /** Sidenav element. */
  @ViewChild('sidenav') sidenav!: ElementRef<HTMLDivElement>;

  /** Nav state persistence key. */
  public readonly navStatePersistenceKey = 'navState';

  /** Nav state getter delegate. */
  public get navState() { return this.contextService.navState; }
  /** Nav state setter. */
  public set navState(value) {
    this.contextService.navState = value;

    // immediate inline change event response
    const navStateConfiguration = this.navStateConfigurations[this.navState];
    this.sidenav.nativeElement.style.width = navStateConfiguration.width;
    // this.navStateChanged.emit(navStateConfiguration);
  }
  /** Nav state changed event emitter delegate. */
  @Output() public get navStateChanged() { return this.contextService.navStateChanged$; }

  /** Nav state enum accessor. */
  public readonly NavState = NavState;

  /* Contexts getter delegate. */
  public get contexts() { return this.contextService.contexts; }
  /* Contexts setter delegate. */
  public set contexts(value: Context[]) { this.contextService.contexts = value; }

  /** Selected context getter delegate. */
  public get selectedContext() { return this.contextService.selectedContext; }
  /** Selected context setter delegate. */
  public set selectedContext(value: Context | undefined) { this.contextService.selectedContext = value; }

  /** Whether context switcher is in editing mode getter delegate. */
  public get isEditing() { return this.contextService.isEditing; }
  /** Whether context switcher is in editing mode setter delegate. */
  public set isEditing(value: boolean) { this.contextService.isEditing = value; }

  /** Nav state configurations delegate. */
  public get navStateConfigurations() { return this.contextService.navStateConfigurations; }

  /**
   * Constructs the context switcher "nav" component.
   *
   * @param contextService The context service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly contextService: ContextService,
    public readonly uiService: UiService,
    public readonly inputService: InputService,
    public readonly persistenceService: PersistenceService,
  ) { }

  /** Initialization */
  ngAfterViewInit() {
    setTimeout(() => this.Initialize());
  }

  /** Initialization */
  Initialize() {
    this.navState = this.navState;
  }

  /** Get context caption delegate. */
  public getCaption(item: Context) { return this.contextService.getCaption(item); }

  /** Get context tooltip title delegate. */
  public getTitle(item: Context) { return this.contextService.getTitle(item); }

  /** Nav click event handler */
  // tslint:disable-next-line: variable-name
  public toggleNav(_event: MouseEvent) {
    if (this.isEditing) {
      this.stopEditing();
      return;
    }
    this.toggleNavState();
  }

  /** Stop context editing */
  private stopEditing() {
    if (this.isEditing) {
      const contexts = this.contexts;
      this.contexts = contexts;
      // this.persistenceService.setItem(this.contextsPersistenceKey, JSON.stringify(this.contexts));
      this.isEditing = false;
      return;
    }
  }

  /** Toggle nav state */
  public toggleNavState() {
    this.navState = (this.navState + 1) % this.navStateConfigurations.length;
  }
}
