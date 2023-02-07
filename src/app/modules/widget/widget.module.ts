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

import { ChartModule } from '../../modules/chart/chart.module';

import { ToggleModule } from '../toggle/toggle.module';
import { TruncatorModule } from '../truncator/truncator.module';
import { ThemeChangerModule } from '../theme-changer/theme-changer.module';
import { SettingsSharerModule } from '../settings-sharer/settings-sharer.module';
import { PropertyModule } from '../property/property.module';
import { HeaderModule } from '../header/header.module';

import { ToolbarService } from '../../services/toolbar/toolbar.service';

/** Widget module. */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,

    ChartModule,

    ToggleModule,
    TruncatorModule,
    ThemeChangerModule,
    SettingsSharerModule,
    PropertyModule,

    HeaderModule,
  ],
  providers: [
    ToolbarService,
  ],
  exports: [
    ToggleModule,
    TruncatorModule,
    ThemeChangerModule,
    SettingsSharerModule,
    PropertyModule,

    HeaderModule,
  ]
})
export class WidgetModule { }
