// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FooterProviderRoutingModule } from './footer-provider-routing.module';

import { FooterProviderComponent } from '../../components/footer-provider/footer-provider.component';

/** FooterProvider module. */
@NgModule({
  declarations: [FooterProviderComponent],
  imports: [
    CommonModule,
    FormsModule,
    FooterProviderRoutingModule,
  ],
  exports: [FooterProviderComponent]
})
export class FooterProviderModule { }
