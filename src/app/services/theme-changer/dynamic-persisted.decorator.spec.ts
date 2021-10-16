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
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DynamicPersisted } from './dynamic-persisted.decorator';
import { ThemeChangerService } from './theme-changer.service';

describe('dynamic-persisted.decorator', () => {
  let service: ThemeChangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ThemeChangerService
      ]
    });
    service = TestBed.inject(ThemeChangerService);
  });

  it('should be created', () => {
    DynamicPersisted<ThemeChangerService>('onThemeChange', 'persistenceService', 'default');
    DynamicPersisted<ThemeChangerService>('onThemeChange', 'persistenceService', 'default1', 'default2');
    expect(service).toBeTruthy();
  });
});
