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
/* eslint-disable max-len */
import { TestBed } from '@angular/core/testing';

import { LogUpdateService } from './log-update.service';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('LogUpdateService', () => {
  let service: LogUpdateService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ServiceWorkerModule.register('', { enabled: false }),
      ],
      providers: [
        LogUpdateService,
        SwUpdate,
      ]
    });
    service = TestBed.inject(LogUpdateService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
