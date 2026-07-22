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
// This file is required by vitest.config.ts and loads recursively all the .spec and framework files

import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting
} from '@angular/platform-browser/testing';

type PlotlyInstance = typeof import('plotly.js') & Record<string, unknown>;

interface GlobalWithPlotly {
  Plotly: PlotlyInstance | null;
  __PLOTLY_SOURCE: string | null;
  __PLOTLY_VERSION: string | null;
}

const g = globalThis as unknown as GlobalWithPlotly;

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

// Load Plotly from npm in the browser-like test environment.
const loadPlotlyFromNpm = async (): Promise<PlotlyInstance | null> => {
  if (typeof window === 'undefined' || !('document' in window)) return null;
  if (g.Plotly) return g.Plotly;

  const plotlyModule = await import('plotly.js/dist/plotly-geo.min.js');
  const plotly = plotlyModule.default as unknown as PlotlyInstance;
  if (plotly) {
    g.Plotly = plotly;
  }
  return plotly;
};

const plotlyFromNpm = await loadPlotlyFromNpm();
g.Plotly = plotlyFromNpm ?? null;

// Mark which Plotly implementation is active so tests / Playwright can detect it
g.__PLOTLY_SOURCE = plotlyFromNpm ? 'npm' : null;
g.__PLOTLY_VERSION = (plotlyFromNpm && (plotlyFromNpm['version'] as string)) || null;
// if (typeof console !== 'undefined' && console.info) {
//   console.info('[tests] Plotly source:', g.__PLOTLY_SOURCE, 'version:', g.__PLOTLY_VERSION);
// }

// Instrument Plotly.newPlot to record whether a real plot call happened during tests.
try {
  const p = g.Plotly;
  if (p) {
    p['_test_plotCalled'] = false;
    const orig = p.newPlot;
    p.newPlot = (...args: Parameters<typeof p.newPlot>) => {
      try {
        p['_test_plotCalled'] = true;
      } catch (instrumentError) {
        console.warn('[tests] Failed to set _test_plotCalled:', instrumentError);
      }
      return orig.apply(p, args);
    };
  }
} catch {
  // ignore instrumentation errors
}

// First, initialize the Angular testing environment (idempotent).
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
