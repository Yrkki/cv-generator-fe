import { AppPage } from './app.po';

describe('cv-generator-fe App', () => {
  let page: AppPage;
  let originalTimeout: number;

  beforeEach(() => {
    page = new AppPage();

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2 * 60 * 1000; // default 5000
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should display Curriculum Vitae', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Curriculum Vitae');
  });

  it('should display name', () => {
    page.navigateToWebpage();
    expect(page.getParagraphText()).toContain('Georgi Marinov');
  });
});
