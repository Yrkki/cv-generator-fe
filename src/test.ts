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
// This file is required by vitest.config.ts and initializes the Angular testing environment and test mocks.

import '@angular/compiler';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting
} from '@angular/platform-browser/testing';

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  try {
    Object.defineProperty(document, 'baseURI', {
      value: 'http://localhost/',
      configurable: true
    });
  } catch {
    // ignore if baseURI is not configurable in this environment
  }
}


// Initialize the Zoneless Angular testing environment (idempotent)
try {
  getTestBed().initTestEnvironment(
    BrowserTestingModule,
    platformBrowserTesting(), {
    teardown: { destroyAfterEach: false }
  }
  );
} catch (e) {
  // Environment already initialized by another runner; ignore.
}
