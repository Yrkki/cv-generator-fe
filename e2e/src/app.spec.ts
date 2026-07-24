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
import { test, expect } from '@playwright/test';
import { AppPage } from './app.po';

// eslint-disable-next-line max-lines-per-function
test.describe('CV Generator Front End App', async () => {
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 2 * 60 * 1000; // default 5000

  let page: AppPage;

  test.beforeEach(({ page: p }) => {
    page = new AppPage(p);

    // browser.waitForAngularEnabled(false);
  });

  test('should display Curriculum Vitae first entity text', async () => {
    await page.navigateTo();
    expect(void page.getFirstEntityText()).toContain('Curriculum Vitae');
  });

  test('should display webpage name', async () => {
    await page.navigateToModule('webpage');
    expect(void page.getWebpageNameText()).toContain('Georgi Marinov');
  });

  test('should display corporate name', async () => {
    await page.navigateToModule('corporate');
    expect(void page.getCorporateNameText()).toContain('Marinov');
  });

  test('should be able to navigate to the main page', async () => {
    expect(void page.navigateTo()).toBeTruthy();
  });

  test('should be able to navigate to the main page and have no severe browser errors', async () => {
    await page.navigateTo();
    expect(page.getBrowserErrors()).toHaveLength(0);
  });

  const modules = [
    { moduleName: 'ContextSwitcher', fileName: 'context-switcher' },
    { moduleName: 'Context', fileName: 'context' },
    { moduleName: 'Portfolio', fileName: 'portfolio' },
    { moduleName: 'Webpage', fileName: 'webpage' },
    { moduleName: 'Corporate', fileName: 'corporate' },
    { moduleName: 'Navigation', fileName: 'navigation' },
    { moduleName: 'Search', fileName: 'search' },
    { moduleName: 'SearchProvider', fileName: 'search-provider' },
    { moduleName: 'Cv', fileName: 'cv' },
    { moduleName: 'ProjectSummary', fileName: 'project-summary' },
    { moduleName: 'Project', fileName: 'project' },
    { moduleName: 'GeneralTimeline', fileName: 'general-timeline' },
    { moduleName: 'Footer', fileName: 'footer' },
    { moduleName: 'Property', fileName: 'property' },
    { moduleName: 'PropertyProvider', fileName: 'property-provider' },
    { moduleName: 'SocBar', fileName: 'soc-bar' },
    { moduleName: 'PersonalData', fileName: 'personal-data' },
    { moduleName: 'Background', fileName: 'background' },
    { moduleName: 'Accomplishments', fileName: 'accomplishments' },
    { moduleName: 'Accomplishment', fileName: 'accomplishment' },
    { moduleName: 'Education', fileName: 'education' },
    { moduleName: 'ProfessionalExperience', fileName: 'professional-experience' },
    { moduleName: 'Language', fileName: 'language' },
    { moduleName: 'Course', fileName: 'course' },
    { moduleName: 'GeneralTimelineMap', fileName: 'general-timeline-map' },
    { moduleName: 'Publication', fileName: 'publication' },
    { moduleName: 'ProjectGanttChartMap', fileName: 'project-gantt-chart-map' },
    { moduleName: 'ProjectContributions', fileName: 'project-contributions' },
    { moduleName: 'Index', fileName: 'index' },
    { moduleName: 'CourseList', fileName: 'course-list' },
    { moduleName: 'PublicationList', fileName: 'publication-list' },
    { moduleName: 'Spectrum', fileName: 'spectrum' },
    { moduleName: 'SpectrumProvider', fileName: 'spectrum-provider' },
    { moduleName: 'Map', fileName: 'map' },
    { moduleName: 'ProjectGanttChart', fileName: 'project-gantt-chart' },
    { moduleName: 'ProjectList', fileName: 'project-list' },
    { moduleName: 'ProjectIndex', fileName: 'project-index' },
    { moduleName: 'ProjectCard', fileName: 'project-card' },
    { moduleName: 'Geolocation', fileName: 'geolocation' },
    { moduleName: 'ThemeChanger', fileName: 'theme-changer' },
    { moduleName: 'SettingsSharer', fileName: 'settings-sharer' },
    { moduleName: 'Pipeline', fileName: 'pipeline' },
    { moduleName: 'ServiceCatalog', fileName: 'service-catalog' },
    { moduleName: 'ReferenceArchitecture', fileName: 'reference-architecture' },
    { moduleName: 'Version', fileName: 'version' },
    { moduleName: 'Badge', fileName: 'badge' },
    { moduleName: 'Header', fileName: 'header' },
    { moduleName: 'HeaderTitle', fileName: 'header-title' },
    { moduleName: 'Category', fileName: 'category' },
    { moduleName: 'Classifier', fileName: 'classifier' },
    { moduleName: 'Sorter', fileName: 'sorter' },
    { moduleName: 'Truncator', fileName: 'truncator' },
    { moduleName: 'Toggle', fileName: 'toggle' },
    { moduleName: 'MultiToggle', fileName: 'nulti-toggle' },
    { moduleName: 'Toolbar', fileName: 'toolbar' },
    { moduleName: 'Selector', fileName: 'selector' },
    { moduleName: 'SelectorHeader', fileName: 'selector-header' },
  ];
  for (const module of modules) {
    test(`should be able to navigate to the ${module.moduleName} module and have no severe browser errors`, async () => {
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
