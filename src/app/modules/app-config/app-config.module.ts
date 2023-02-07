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

import { UpdateModule } from '../../modules/update/update.module';

import { AppService } from '../../services/app/app.service';
import { ConfigService } from '../../services/config/config.service';
import { IsSecureGuardService } from '../../services/is-secure-guard/is-secure-guard.service';

/** AppConfig module. */
@NgModule({
  declarations: [],
  imports: [
    UpdateModule,
  ],
  providers: [
    AppService,
    ConfigService,
    IsSecureGuardService,
  ],
  exports: [
  ]
})
export class AppConfigModule { }
