// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContextRoutingModule } from './context-routing.module';

import { ContextComponent } from '../../components/context/context.component';
import { HttpClientModule } from '@angular/common/http';

/** Context module. */
@NgModule({
  declarations: [ContextComponent],
  imports: [
    CommonModule,
    FormsModule,
    ContextRoutingModule,
    HttpClientModule,
  ],
  exports: [ContextComponent, HttpClientModule]
})
export class ContextModule { }
