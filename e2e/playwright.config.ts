// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Georgi Marinov
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
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Replaces: specs: ['./src/**/*.e2e-spec.ts']
  testDir: './src',
  testMatch: '**/*.spec.ts',

  // Replaces: jasmineNodeOpts.defaultTimeoutInterval: 120000
  timeout: 120000,

  // Replaces: allScriptsTimeout: 11000
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL ?? 'http://localhost:5000/',
    actionTimeout: 11000,

    // Replaces: directConnect: true (no Selenium hub, direct browser)
    // Replaces: SELENIUM_PROMISE_MANAGER: false (native async/await)
    // Both are the default in Playwright — no extra config needed.
  },

  // Replaces: jasmineNodeOpts.showColors: true
  reporter: [['list', { printSteps: true }]],

  // Replaces: capabilities: { browserName: 'chrome' }
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  // Replaces: onPrepare with ts-node + tsconfig registration
  // Playwright uses its own TypeScript compilation — no ts-node needed.
  // tsconfig equivalent: see e2e/tsconfig.json

});
