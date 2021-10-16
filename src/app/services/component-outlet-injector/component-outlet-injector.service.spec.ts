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
import { TestBed } from '@angular/core/testing';

import { ComponentOutletInjectorService } from './component-outlet-injector.service';

describe('ComponentOutletInjectorService', () => {
  let service: ComponentOutletInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentOutletInjectorService]
    });
    service = TestBed.inject(ComponentOutletInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.getInjector({});
      readAll = service.getInjector({}, 1);
    }).not.toThrowError();
  });
});
