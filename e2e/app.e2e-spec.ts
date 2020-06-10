import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('cv-generator-fe App', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 4 * 60 * 1000; // default 5000

  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();

    browser.waitForAngularEnabled(false);
  });

  it('should display Curriculum Vitae', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Curriculum Vitae');
  });

  it('should display name', () => {
    page.navigateToWebpage();
    expect(page.getNameText()).toContain('Georgi Marinov');
  });
});
