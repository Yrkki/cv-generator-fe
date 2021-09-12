// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationRoutingModule } from './publication-routing.module';
import { PublicationIndexModule } from '../publication-index/publication-index.module';
import { PublicationListModule } from '../publication-list/publication-list.module';
import { SorterModule } from '../sorter/sorter.module';
import { HeaderModule } from '../header/header.module';

import { PublicationComponent } from '../../components/publication/publication.component';

/** Publication module. */
@NgModule({
  declarations: [PublicationComponent],
  imports: [
    CommonModule,
    PublicationRoutingModule,
    PublicationIndexModule,
    PublicationListModule,
    SorterModule,
    HeaderModule,
  ],
  exports: [PublicationComponent]
})
export class PublicationModule { }
