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

import { AccomplishmentsRoutingModule } from './accomplishments-routing.module';
import { AccomplishmentsProviderModule } from '../accomplishments-provider/accomplishments-provider.module';

import { AccomplishmentModule } from '../accomplishment/accomplishment.module';
import { GeneralTimelineMapModule } from '../general-timeline-map/general-timeline-map.module';
import { PublicationModule } from '../publication/publication.module';
import { HeaderModule } from '../header/header.module';

import { OntologyModule } from '../../modules/ontology/ontology.module';

import { AccomplishmentsService } from '../../services/accomplishments/accomplishments.service';

import { AccomplishmentsComponent } from '../../components/accomplishments/accomplishments.component';

/** Accomplishments module. */
@NgModule({
  declarations: [AccomplishmentsComponent],
  imports: [
    CommonModule,

    AccomplishmentsRoutingModule,
    AccomplishmentsProviderModule,

    AccomplishmentModule,
    GeneralTimelineMapModule,
    PublicationModule,

    HeaderModule,

    OntologyModule,
  ],
  providers: [
    AccomplishmentsService,
  ],
  exports: [AccomplishmentsComponent]
})
export class AccomplishmentsModule { }
