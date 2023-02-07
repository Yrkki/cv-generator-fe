// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';
import { SearchProviderModule } from '../search-provider/search-provider.module';

import { SearchComponent } from '../../components/search/search.component';

import { ToggleModule } from '../toggle/toggle.module';
import { HeaderModule } from '../header/header.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

import { SearchEngineService } from '../../services/search-engine/search-engine.service';
import { SearchHistoryService } from '../../services/search-history/search-history.service';
import { SearchTokenizerService } from '../../services/search-tokenizer/search-tokenizer.service';

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
  providers: [
    SearchEngineService,
    SearchHistoryService,
    SearchTokenizerService,
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
