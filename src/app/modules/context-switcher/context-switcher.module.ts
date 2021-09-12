// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContextSwitcherRoutingModule } from './context-switcher-routing.module';

import { ContextSwitcherComponent } from '../../components/context-switcher/context-switcher.component';

import { ContextModule } from '../context/context.module';
import { HttpClientModule } from '@angular/common/http';

/** ContextSwitcher module. */
@NgModule({
  declarations: [ContextSwitcherComponent],
  imports: [
    CommonModule,
    FormsModule,
    ContextSwitcherRoutingModule,
    ContextModule,
    HttpClientModule,
  ],
  exports: [ContextSwitcherComponent, HttpClientModule]
})
export class ContextSwitcherModule { }
