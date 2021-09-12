// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectorRoutingModule } from './selector-routing.module';
import { SelectorHeaderModule } from '../selector-header/selector-header.module';

import { SelectorComponent } from '../../components/selector/selector.component';

/** Selector module. */
@NgModule({
  declarations: [SelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    SelectorRoutingModule,
    SelectorHeaderModule,
  ],
  exports: [SelectorComponent]
})
export class SelectorModule { }
