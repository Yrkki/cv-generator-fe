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
import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

/** Main page class */
export class AppPage {
  /** Navigate to main page */
  navigateTo(): Promise<unknown> {
    const destination = browser.baseUrl;
    const response$ = browser.get(destination);
    // browser.wait(protractor.ExpectedConditions.urlContains(destination), jasmine.DEFAULT_TIMEOUT_INTERVAL);
    return response$ as Promise<unknown>;
  }

  /** Navigate to module */
  navigateToModule(moduleRouterPath: string): Promise<unknown> {
    const destination = browser.baseUrl + '/' + moduleRouterPath;
    const response$ = browser.get(destination);
    // browser.wait(protractor.ExpectedConditions.urlContains(moduleRouterPath), jasmine.DEFAULT_TIMEOUT_INTERVAL);
    return response$ as Promise<unknown>;
  }

  /** Test first entity text */
  getFirstEntityText(): Promise<string> {
    const e = element.all(by.css('app-root h1')).get(1);
    browser.wait(protractor.ExpectedConditions.presenceOf(e), jasmine.DEFAULT_TIMEOUT_INTERVAL);
    return e.getText() as Promise<string>;
  }

  /** Test webpage name text */
  getWebpageNameText(): Promise<string> {
    const e = element(by.css('app-webpage div div h1'));
    // console.log('Debug: jasmine.DEFAULT_TIMEOUT_INTERVAL: ', jasmine.DEFAULT_TIMEOUT_INTERVAL);
    browser.wait(protractor.ExpectedConditions.presenceOf(e), jasmine.DEFAULT_TIMEOUT_INTERVAL);
    return e.getText() as Promise<string>;
  }

  /** Test corporate name text */
  getCorporateNameText(): Promise<string> {
    const e = element(by.css('app-corporate div div h1'));
    browser.wait(protractor.ExpectedConditions.presenceOf(e), jasmine.DEFAULT_TIMEOUT_INTERVAL);
    return e.getText() as Promise<string>;
  }
}
