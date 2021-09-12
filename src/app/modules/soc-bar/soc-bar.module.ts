// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocBarRoutingModule } from './soc-bar-routing.module';

import { SocBarComponent } from '../../components/soc-bar/soc-bar.component';

/** SocBar module. */
@NgModule({
  declarations: [SocBarComponent],
  imports: [
    CommonModule,
    SocBarRoutingModule,
  ],
  exports: [SocBarComponent]
})
export class SocBarModule { }
