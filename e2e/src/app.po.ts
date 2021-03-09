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
    const e = element.all(by.css('app-root h1')).get(2);
    browser.wait(protractor.ExpectedConditions.presenceOf(e), jasmine.DEFAULT_TIMEOUT_INTERVAL);
    return e.getText() as Promise<string>;
  }

  /** Test webpage name text */
  getWebpageNameText(): Promise<string> {
    const e = element(by.css('app-webpage h1'));
    // console.log('Debug: jasmine.DEFAULT_TIMEOUT_INTERVAL: ', jasmine.DEFAULT_TIMEOUT_INTERVAL);
    browser.wait(protractor.ExpectedConditions.presenceOf(e), jasmine.DEFAULT_TIMEOUT_INTERVAL);
    return e.getText() as Promise<string>;
  }
}
