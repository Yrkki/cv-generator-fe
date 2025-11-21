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

import { DocumentService } from './document.service';

// eslint-disable-next-line max-lines-per-function
describe('DocumentService', () => {
  let service: DocumentService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check scroll function', () => {
    let readAll;
    readAll = service.scrollFunction();

    const button = document.createElement('BUTTON') as HTMLButtonElement;
    button.id = 'go-to-top-btn';
    document.documentElement.appendChild(button);

    [1, -1].forEach((scrollTopThreshold) => {
      debugService.scrollTopThreshold = scrollTopThreshold;
      readAll = service.scrollFunction();
    });
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    const readAll = service.goToTop();
    expect(service).toBeTruthy();
  });
});
