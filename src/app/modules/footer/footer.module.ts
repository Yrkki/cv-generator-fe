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

import { FooterRoutingModule } from './footer-routing.module';
import { FooterProviderModule } from '../footer-provider/footer-provider.module';

import { FooterComponent } from '../../components/footer/footer.component';
import { GeolocationModule } from '../geolocation/geolocation.module';
import { SubfooterModule } from '../subfooter/subfooter.module';
import { NavigationModule } from '../navigation/navigation.module';
import { SearchModule } from '../search/search.module';
import { BadgeModule } from '../badge/badge.module';
import { HeaderModule } from '../header/header.module';

/** Footer module. */
@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    FormsModule,

    FooterRoutingModule,
    FooterProviderModule,

    GeolocationModule,

    SubfooterModule,
    NavigationModule,
    SearchModule,

    BadgeModule,

    HeaderModule,
  ],
  exports: [
    FooterComponent,

    SubfooterModule,
    NavigationModule,
    SearchModule,

    BadgeModule,
  ]
})
export class FooterModule { }
