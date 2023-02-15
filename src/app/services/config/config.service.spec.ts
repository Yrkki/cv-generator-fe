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
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { ConfigService } from './config.service';

// eslint-disable-next-line max-lines-per-function
describe('ConfigService', () => {
  let service: ConfigService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ConfigService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      TestingCommon.disableLogging();

      readAll = service.fetchConfig('/config').catch();
      readAll = service.fetchConfig('/test-error').catch();
      readAll = service.fetchConfig().catch();

      const response = { status: 200, json: async () => { }, headers: new Headers() } as Response;
      response.headers.append('content-type', 'application/json');
      readAll = debugService.onResponse(response);

      readAll = debugService.onConfig({});
      readAll = debugService.onConfig({ test: true });

      readAll = debugService.onError({});

      TestingCommon.enableLogging();
    }).not.toThrowError();
  });
});
