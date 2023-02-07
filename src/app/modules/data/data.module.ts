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

import { DataService } from '../../services/data/data.service';
import { ImageDataService } from '../../services/image-data/image-data.service';
import { DataLoaderService } from '../../services/data-loader/data-loader.service';

import { PersistenceService } from '../../services/persistence/persistence.service';

/** Data module. */
@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    DataService,
    ImageDataService,
    DataLoaderService,

    PersistenceService,
  ],
  exports: []
})
export class DataModule { }
