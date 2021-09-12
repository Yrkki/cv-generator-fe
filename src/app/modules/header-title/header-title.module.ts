// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderTitleRoutingModule } from './header-title-routing.module';

import { HeaderTitleComponent } from '../../components/header-title/header-title.component';
import { SorterModule } from '../sorter/sorter.module';

/** HeaderTitle module. */
@NgModule({
  declarations: [HeaderTitleComponent],
  imports: [
    CommonModule,
    FormsModule,
    HeaderTitleRoutingModule,
    SorterModule,
  ],
  exports: [HeaderTitleComponent]
})
export class HeaderTitleModule { }
