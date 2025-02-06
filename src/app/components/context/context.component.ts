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
import { Component, ViewChild, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

import { Context } from '../../interfaces/context/context';
import { NavState } from '../../enums/nav-state';

import { ContextService } from '../../services/context/context.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { Subscription } from 'rxjs';

/**
 * Context component
 * ~implements {@link OnInit}
 * ~implements {@link OnDestroy}
 */
@Component({
  standalone: false,
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit, OnDestroy {
  /** Context. */
  @Input() public context!: Context;

  /** Context caption */
  @Input() public caption = '';

  /** Context tooltip title */
  @Input() public title = '';

  /** Tab clickable element. */
  @ViewChild('clickableTab') clickableTab!: ElementRef<HTMLElement>;

  /** Input element. */
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  /** Delete clickable element. */
  @ViewChild('clickableDelete') clickableDelete!: ElementRef<HTMLSpanElement>;

  /** Nav state enum accessor. */
  public readonly NavState = NavState;

  /** Tinted toggled subscription. */
  private tintedToggledSubscription: Subscription | undefined;

  /**
   * Constructs the context component.
   *
   * @param contextService The context service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   */
  constructor(
    public readonly contextService: ContextService,
    public readonly uiService: UiService,
    public readonly inputService: InputService,
  ) {
  }

  /** Subscription */
  ngOnInit() {
    this.tintedToggledSubscription = this.uiService.tintedToggled$.subscribe((_: boolean) => {
      const navStateConfiguration = this.contextService.navStateConfigurations[this.contextService.navState];
      this.contextService.navStateChanged$.emit(navStateConfiguration);
    });
  }

  /** Cleanup */
  ngOnDestroy() {
    this.tintedToggledSubscription?.unsubscribe();
  }

  /** On context selection event handler */
  public onSelect(event: MouseEvent, item: Context): void {
    event.stopPropagation();
    if (this.contextService.navState === NavState.Open && this.contextService.contextEquals(item, this.contextService.selectedContext)) {
      // version the selected context first
      this.new();

      // start editing
      this.contextService.isEditing = true;
    } else {
      this.changeContext(item);
    }

    this.focus();
  }

  /** Change context */
  private changeContext(item: Context) {
    this.contextService.selectedContext = item;

    // respond to event
    if (!this.contextService.isEditing) {
      // refresh
      this.tintedToggledSubscription?.unsubscribe();
      this.uiService.uiInvalidated$.emit(true);
    }
  }

  /** Focus */
  private focus() {
    if (this.contextService.isEditing) {
      if (this.input) {
        this.input.nativeElement.focus();
      }
    }
  }

  /** On context deletion event handler */
  public onDelete(event: MouseEvent) {
    event.stopPropagation();
    this.delete(this.contextService.selectedContext);
    this.contextService.selectedContext = undefined;
    // this.stopEditing();
  }

  /** Replicate context */
  private get newContext() {
    const context = this.contextService.selectedContext;

    // const newId = context?.id ?? 0;
    const newId = this.nextId();
    const newName = context?.name ?? '';
    // const { contexts, selectedContext, navState, ...serializabeStorage } = this.persistenceService.storage.storage;
    const newStorage = context?.storage ?? {} as Storage;

    const newContext: Context = { id: newId, name: newName, storage: newStorage };
    // this.edit(newContext, newContext);

    return newContext;
  }

  /** Next id for new contexts */
  private nextId() {
    return Math.max(...this.contextService.contexts.map((_) => _.id)) + 1;
  }

  /** Add new context */
  private new() {
    const contexts = this.contextService.contexts;
    contexts.push(this.newContext);
    this.contextService.contexts = contexts;
    // this.persistenceService.setItem(this.contextsPersistenceKey, JSON.stringify(this.contextService.contexts));
  }

  /** Delete context */
  private delete(context?: Context) {
    if (context) {
      this.contextService.contexts = this.contextService.contexts.filter((_) => _.id !== context.id);
    }
  }
}
