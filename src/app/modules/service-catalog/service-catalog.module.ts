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

import { ServiceCatalogRoutingModule } from './service-catalog-routing.module';

import { ServiceCatalogComponent } from '../../components/service-catalog/service-catalog.component';

import { BadgeModule } from '../badge/badge.module';
import { HeaderModule } from '../header/header.module';

/** ServiceCatalog module. */
@NgModule({
  declarations: [ServiceCatalogComponent],
  imports: [
    CommonModule,
    FormsModule,

    ServiceCatalogRoutingModule,

    BadgeModule,
    HeaderModule,
  ],
  exports: [ServiceCatalogComponent]
})
export class ServiceCatalogModule { }
