// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebpageRoutingModule } from './webpage-routing.module';
import { SocBarModule } from '../soc-bar/soc-bar.module';

import { WebpageComponent } from '../../components/webpage/webpage.component';

/** Webpage module. */
@NgModule({
  declarations: [WebpageComponent],
  imports: [
    CommonModule,
    WebpageRoutingModule,
    SocBarModule,
  ],
  exports: [WebpageComponent]
})
export class WebpageModule { }
