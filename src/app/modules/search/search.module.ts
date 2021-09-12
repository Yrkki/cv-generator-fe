// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchProviderModule } from '../search-provider/search-provider.module';

import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from '../../components/search/search.component';

import { ToggleModule } from '../toggle/toggle.module';
import { HeaderModule } from '../header/header.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

/** Search module. */
@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    SearchProviderModule,
    ToggleModule,
    HeaderModule,
    ToolbarModule,
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
