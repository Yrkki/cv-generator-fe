// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionalExperienceRoutingModule } from './professional-experience-routing.module';

import { ProfessionalExperienceComponent } from '../../components/professional-experience/professional-experience.component';

import { SelectorHeaderModule } from '../selector-header/selector-header.module';
import { SelectorModule } from '../selector/selector.module';

/** ProfessionalExperience module. */
@NgModule({
  declarations: [ProfessionalExperienceComponent],
  imports: [
    CommonModule,
    ProfessionalExperienceRoutingModule,
    SelectorHeaderModule,
    SelectorModule,
  ],
  exports: [ProfessionalExperienceComponent]
})
export class ProfessionalExperienceModule { }
