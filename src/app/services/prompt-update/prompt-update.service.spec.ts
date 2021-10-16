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
import { TestBed } from '@angular/core/testing';
import { UpdateAvailableEvent } from '@angular/service-worker';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { PromptUpdateService } from './prompt-update.service';

// eslint-disable-next-line max-lines-per-function
describe('PromptUpdateService', () => {
  let service: PromptUpdateService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ServiceWorkerModule.register('', { enabled: false }),
        HttpClientModule,
      ],
      providers: [PromptUpdateService]
    });
    service = TestBed.inject(PromptUpdateService);
    debugService = service as any;

    service.uiService.windowReload = TestingCommon.mockWindowReload;
    TestingCommon.disableLogging();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = debugService.promptUser(undefined);
      readAll = debugService.activateUpdate();

      readAll = debugService.reportUpdate();

      readAll = debugService.onUpdateAvailableEvent({} as UpdateAvailableEvent);
      debugService.promptUser = () => false;
      readAll = debugService.onUpdateAvailableEvent({} as UpdateAvailableEvent);

      readAll = service.windowReload();
    }).not.toThrowError();
  });
});
