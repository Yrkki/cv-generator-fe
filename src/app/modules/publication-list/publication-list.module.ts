// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationListRoutingModule } from './publication-list-routing.module';

import { PublicationListComponent } from '../../components/publication-list/publication-list.component';

/** PublicationList module. */
@NgModule({
  declarations: [PublicationListComponent],
  imports: [
    CommonModule,
    PublicationListRoutingModule,
  ],
  exports: [PublicationListComponent]
})
export class PublicationListModule { }
