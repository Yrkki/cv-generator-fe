// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { PersonalDataModule } from '../personal-data/personal-data.module';
import { BackgroundModule } from '../background/background.module';
import { AccomplishmentsModule } from '../accomplishments/accomplishments.module';

import { CvComponent } from '../../components/cv/cv.component';

/** Cv module. */
@NgModule({
  declarations: [CvComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    PersonalDataModule,
    BackgroundModule,
    AccomplishmentsModule,
  ],
  exports: [CvComponent]
})
export class CvModule { }
