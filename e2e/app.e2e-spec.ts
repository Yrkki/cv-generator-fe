import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('cv-generator-fe App', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 4 * 60 * 1000; // default 5000

  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Curriculum Vitae', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    expect(page.getParagraphText()).toContain('Curriculum Vitae');
  });

  it('should display name', () => {
    page.navigateToWebpage();
    browser.waitForAngularEnabled(false);
    expect(page.getNameText()).toContain('Georgi Marinov');
  });
});
