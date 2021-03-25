import { AppPage } from './app.po';
// import { browser, logging } from 'protractor';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 2 * 60 * 1000; // default 5000

  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();

    browser.waitForAngularEnabled(false);
  });

  it('should display Curriculum Vitae first entity text', () => {
    page.navigateTo();
    expect(page.getFirstEntityText()).toContain('Curriculum Vitae');
  });

  it('should display webpage name', () => {
    page.navigateToModule('webpage');
    expect(page.getWebpageNameText()).toContain('Georgi Marinov');
  });

  it('should be able to navigate to the main page', () => {
    expect(() => page.navigateTo()).toBeTruthy();
  });

  it('should be able to navigate to the ContextSwitcher module', () => {
    expect(() => page.navigateToModule('context-switcher')).toBeTruthy();
  });

  it('should be able to navigate to the Context module', () => {
    expect(() => page.navigateToModule('context')).toBeTruthy();
  });

  it('should be able to navigate to the Portfolio module', () => {
    expect(() => page.navigateToModule('portfolio')).toBeTruthy();
  });

  it('should be able to navigate to the Webpage module', () => {
    expect(() => page.navigateToModule('webpage')).toBeTruthy();
  });

  it('should be able to navigate to the Navigation module', () => {
    expect(() => page.navigateToModule('navigation')).toBeTruthy();
  });

  it('should be able to navigate to the Search module', () => {
    expect(() => page.navigateToModule('search')).toBeTruthy();
  });

  it('should be able to navigate to the Cv module', () => {
    expect(() => page.navigateToModule('cv')).toBeTruthy();
  });

  it('should be able to navigate to the ProjectSummary module', () => {
    expect(() => page.navigateToModule('project-summary')).toBeTruthy();
  });

  it('should be able to navigate to the Project module', () => {
    expect(() => page.navigateToModule('project')).toBeTruthy();
  });

  it('should be able to navigate to the GeneralTimeline module', () => {
    expect(() => page.navigateToModule('general-timeline')).toBeTruthy();
  });

  it('should be able to navigate to the Footer module', () => {
    expect(() => page.navigateToModule('footer')).toBeTruthy();
  });

  it('should be able to navigate to the Property module', () => {
    expect(() => page.navigateToModule('property')).toBeTruthy();
  });

  it('should be able to navigate to the SocBar module', () => {
    expect(() => page.navigateToModule('soc-bar')).toBeTruthy();
  });

  it('should be able to navigate to the PersonalData module', () => {
    expect(() => page.navigateToModule('personal-data')).toBeTruthy();
  });

  it('should be able to navigate to the Background module', () => {
    expect(() => page.navigateToModule('background')).toBeTruthy();
  });

  it('should be able to navigate to the Accomplishments module', () => {
    expect(() => page.navigateToModule('accomplishments')).toBeTruthy();
  });

  it('should be able to navigate to the Education module', () => {
    expect(() => page.navigateToModule('education')).toBeTruthy();
  });

  it('should be able to navigate to the ProfessionalExperience module', () => {
    expect(() => page.navigateToModule('professional-experience')).toBeTruthy();
  });

  it('should be able to navigate to the Language module', () => {
    expect(() => page.navigateToModule('language')).toBeTruthy();
  });

  it('should be able to navigate to the Course module', () => {
    expect(() => page.navigateToModule('course')).toBeTruthy();
  });

  it('should be able to navigate to the GeneralTimelineMap module', () => {
    expect(() => page.navigateToModule('general-timeline-map')).toBeTruthy();
  });

  it('should be able to navigate to the Publication module', () => {
    expect(() => page.navigateToModule('publication')).toBeTruthy();
  });

  it('should be able to navigate to the ProjectGanttChartMap module', () => {
    expect(() => page.navigateToModule('project-gantt-chart-map')).toBeTruthy();
  });

  it('should be able to navigate to the ProjectContributions module', () => {
    expect(() => page.navigateToModule('project-contributions')).toBeTruthy();
  });

  it('should be able to navigate to the CourseIndex module', () => {
    expect(() => page.navigateToModule('course-index')).toBeTruthy();
  });

  it('should be able to navigate to the CourseList module', () => {
    expect(() => page.navigateToModule('course-list')).toBeTruthy();
  });

  it('should be able to navigate to the PublicationIndex module', () => {
    expect(() => page.navigateToModule('publication-index')).toBeTruthy();
  });

  it('should be able to navigate to the PublicationList module', () => {
    expect(() => page.navigateToModule('publication-list')).toBeTruthy();
  });

  it('should be able to navigate to the Spectrum module', () => {
    expect(() => page.navigateToModule('spectrum')).toBeTruthy();
  });

  it('should be able to navigate to the Map module', () => {
    expect(() => page.navigateToModule('map')).toBeTruthy();
  });

  it('should be able to navigate to the ProjectGanttChart module', () => {
    expect(() => page.navigateToModule('project-gantt-chart')).toBeTruthy();
  });

  it('should be able to navigate to the ProjectList module', () => {
    expect(() => page.navigateToModule('project-list')).toBeTruthy();
  });

  it('should be able to navigate to the ProjectIndex module', () => {
    expect(() => page.navigateToModule('project-index')).toBeTruthy();
  });

  it('should be able to navigate to the ProjectCard module', () => {
    expect(() => page.navigateToModule('project-card')).toBeTruthy();
  });

  it('should be able to navigate to the Geolocation module', () => {
    expect(() => page.navigateToModule('geolocation')).toBeTruthy();
  });

  it('should be able to navigate to the ThemeChanger module', () => {
    expect(() => page.navigateToModule('theme-changer')).toBeTruthy();
  });

  it('should be able to navigate to the SettingsSharer module', () => {
    expect(() => page.navigateToModule('settings-sharer')).toBeTruthy();
  });

  it('should be able to navigate to the Pipeline module', () => {
    expect(() => page.navigateToModule('pipeline')).toBeTruthy();
  });

  it('should be able to navigate to the ServiceCatalog module', () => {
    expect(() => page.navigateToModule('service-catalog')).toBeTruthy();
  });

  it('should be able to navigate to the Version module', () => {
    expect(() => page.navigateToModule('version')).toBeTruthy();
  });

  it('should be able to navigate to the Badge module', () => {
    expect(() => page.navigateToModule('badge')).toBeTruthy();
  });

  it('should be able to navigate to the Header module', () => {
    expect(() => page.navigateToModule('header')).toBeTruthy();
  });

  it('should be able to navigate to the Sorter module', () => {
    expect(() => page.navigateToModule('sorter')).toBeTruthy();
  });

  it('should be able to navigate to the Truncator module', () => {
    expect(() => page.navigateToModule('truncator')).toBeTruthy();
  });

  it('should be able to navigate to the Toggle module', () => {
    expect(() => page.navigateToModule('toggle')).toBeTruthy();
  });

  // [% e2e-test-placeholder %]

  // afterEach(waitForAsync() => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });
});
