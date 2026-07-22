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
import { Page } from '@playwright/test';

/** Main page class */
export class AppPage {
  private readonly errors: string[] = [];

  constructor(private readonly page: Page) {
    this.page.on('console', msg => { if (msg.type() === 'error') this.errors.push(msg.text()); });
  }

  // /** Navigate to main page */
  public async navigateTo(): Promise<void> {
    await this.page.goto('/');
  }

  // /** Navigate to module */
  public async navigateToModule(moduleRouterPath: string): Promise<void> {
    await this.page.goto('/' + moduleRouterPath);
  }

  /** Test first entity text */
  public async getFirstEntityText(): Promise<string> {
    return this.page.locator('app-root h1').first().innerText();
  }

  /** Test webpage name text */
  public async getWebpageNameText(): Promise<string> {
    return this.page.locator('app-webpage div div h1').first().innerText();
  }

  /** Test corporate name text */
  public async getCorporateNameText(): Promise<string> {
    return this.page.locator('app-corporate div div h1').first().innerText();
  }

  /** Test paragraph text */
  public async getParagraphText(): Promise<string> {
    return this.page.locator('app-root p').first().innerText();
  }

  /** Test browser errors */
  public getBrowserErrors(): string[] {
    return this.errors;
  }
}
