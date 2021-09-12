// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BadgeRoutingModule } from './badge-routing.module';

import { BadgeComponent } from '../../components/badge/badge.component';

/** Badge module. */
@NgModule({
  declarations: [BadgeComponent],
  imports: [
    CommonModule,
    FormsModule,
    BadgeRoutingModule,
  ],
  exports: [BadgeComponent]
})
export class BadgeModule { }
