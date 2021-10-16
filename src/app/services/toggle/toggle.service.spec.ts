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

import { ToggleService } from './toggle.service';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('ToggleService', () => {
  let service: ToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ToggleService,
      ]
    });
    service = TestBed.inject(ToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;

      readAll = ToggleService.displayValues;
      readAll = service.captions;
      readAll = service.decorations;
      readAll = service.toggleKindValues;

      readAll = service.persistenceService;
    }).not.toThrowError();
  });

  it('should check public interface toggleKind dependent methods', () => {
    expect(() => {
      let readAll;
      service.toggleKindValues.forEach((toggleKind) => {
        readAll = service.displayValue(toggleKind);
        readAll = service.isSharedPropertyName(toggleKind);
        readAll = service.multiModel(toggleKind);
      });
    }).not.toThrowError();
  });
});
