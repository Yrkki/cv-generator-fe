// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MultiToggleRoutingModule } from './multi-toggle-routing.module';

import { MultiToggleComponent } from '../../components/multi-toggle/multi-toggle.component';

/** MultiToggle module. */
@NgModule({
  declarations: [MultiToggleComponent],
  imports: [
    CommonModule,
    FormsModule,
    MultiToggleRoutingModule
  ],
  exports: [MultiToggleComponent]
})
export class MultiToggleModule { }
