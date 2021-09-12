// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToggleRoutingModule } from './toggle-routing.module';

import { ToggleComponent } from '../../components/toggle/toggle.component';

/** Toggle module. */
@NgModule({
  declarations: [ToggleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToggleRoutingModule
  ],
  exports: [ToggleComponent]
})
export class ToggleModule { }
