// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SorterRoutingModule } from './sorter-routing.module';

import { SorterComponent } from '../../components/sorter/sorter.component';

/** Sorter module. */
@NgModule({
  declarations: [SorterComponent],
  imports: [
    CommonModule,
    FormsModule,
    SorterRoutingModule
  ],
  exports: [SorterComponent]
})
export class SorterModule { }
