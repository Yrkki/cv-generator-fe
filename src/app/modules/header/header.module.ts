// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderRoutingModule } from './header-routing.module';

import { HeaderComponent } from '../../components/header/header.component';
import { ToggleModule } from '../toggle/toggle.module';
import { HeaderTitleModule } from '../header-title/header-title.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

/** Header module. */
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    HeaderRoutingModule,
    ToggleModule,
    HeaderTitleModule,
    ToolbarModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
