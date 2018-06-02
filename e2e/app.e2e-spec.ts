import { AppPage } from './app.po';

describe('cv-generator-fe App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Curriculum Vitae');
  });
});
