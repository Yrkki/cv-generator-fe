// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationIndexRoutingModule } from './publication-index-routing.module';

import { PublicationIndexComponent } from '../../components/publication-index/publication-index.component';

/** PublicationIndex module. */
@NgModule({
  declarations: [PublicationIndexComponent],
  imports: [
    CommonModule,
    PublicationIndexRoutingModule,
  ],
  exports: [PublicationIndexComponent]
})
export class PublicationIndexModule { }
