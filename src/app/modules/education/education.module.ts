// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';

import { EducationComponent } from '../../components/education/education.component';

import { SelectorHeaderModule } from '../selector-header/selector-header.module';
import { SelectorModule } from '../selector/selector.module';

/** Education module. */
@NgModule({
  declarations: [EducationComponent],
  imports: [
    CommonModule,
    EducationRoutingModule,
    SelectorHeaderModule,
    SelectorModule,
  ],
  exports: [EducationComponent]
})
export class EducationModule { }
