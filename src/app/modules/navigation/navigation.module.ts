// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';

import { NavigationComponent } from '../../components/navigation/navigation.component';

import { KeysPipe } from '../../pipes/keys/keys.pipe';

/** Navigation module. */
@NgModule({
  declarations: [NavigationComponent, KeysPipe],
  imports: [
    CommonModule,
    NavigationRoutingModule,
  ],
  exports: [NavigationComponent, KeysPipe]
})
export class NavigationModule { }
