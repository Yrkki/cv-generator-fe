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
/// <reference types="vitest" />
import { configDefaults, defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./src/test.ts'],
    slowTestThreshold: 1000,

    // Pattern for test files
    include: ['src/**/*.spec.ts'],

    // Exclude the entire classes directory (and all subdirectories) from being treated as test suites
    exclude: [
      ...configDefaults.exclude,
      'src/app/classes/**',
    ],

    // Browser Mode Configuration
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      }),
      headless: !!process.env.CI,
      // Removed instances array to avoid duplicate test runners!
    },

    coverage: {
      provider: 'istanbul',
      reportsDirectory: './coverage',
      reporter: ['html', 'lcov', 'text-summary'],
      thresholds: {
        statements: 90,
        lines: 90,
        branches: 60,
        functions: 90,
      },
    },
  },
});
