// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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
