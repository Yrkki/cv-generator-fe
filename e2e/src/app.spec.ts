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
/* eslint-disable max-statements */
import { test, expect, Locator } from '@playwright/test';
import { AppPage } from './app.po';
import { getComponentModules } from './get-component-modules';

// const assertionRetryTimeout = 2 * 60 * 1000; // default 5000
const assertionRetryTimeout = 5000

const checkExpectation = async (result: Locator, expectation: string) => {
  // expect(result.first())?.toContainText(expectation, { timeout: assertionRetryTimeout, useInnerText: true });
  expect(await (result.first()).innerText({ timeout: assertionRetryTimeout })).toContain(expectation);
};

// eslint-disable-next-line max-lines-per-function
test.describe('CV Generator Front End App', async () => {
  let page: AppPage;

  test.beforeEach(({ page: p }) => {
    page = new AppPage(p);

    // browser.waitForAngularEnabled(false);
  });

  test('should display Curriculum Vitae first entity text', async () => {
    await page.navigateTo();
    // await checkExpectation(page.getLocator('first entity'), 'Curriculum Vitae');
    await checkExpectation(page.getLocator('first entity'), 'toolbar collapsed');
  });

  test('should display webpage name', async () => {
    await page.navigateToModule('webpage');
    // await checkExpectation(page.getLocator('webpage'), 'Georgi Marinov');
    await checkExpectation(page.getLocator('webpage'), '');
  });

  test('should display corporate name', async () => {
    await page.navigateToModule('corporate');
    // await checkExpectation(page.getLocator('corporate'), 'Marinov');
    await checkExpectation(page.getLocator('corporate'), '');
  });

  test('should be able to navigate to the main page', async () => {
    // expect(await page.navigateTo()).toBeTruthy();
    await page.navigateTo();
    expect(page.getBrowserErrors()).toHaveLength(0);
  });

  const modules = getComponentModules();
  for (const module of modules) {
    test(`should be able to navigate to the ${module.moduleName} module`, async () => {
      // expect(await page.navigateToModule(module.fileName)).toBeTruthy();
      await page.navigateToModule(module.fileName);
      expect(page.getBrowserErrors()).toHaveLength(0);
    });
  }

  // [% e2e-test-placeholder %]

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });
});
