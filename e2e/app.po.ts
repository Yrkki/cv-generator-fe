import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    const e = element(by.css('app-root h1'));
    browser.wait(protractor.ExpectedConditions.presenceOf(e), jasmine.DEFAULT_TIMEOUT_INTERVAL);
    return e.getText();
  }

  navigateToWebpage() {
    return browser.get('/Webpage');
  }

  getNameText() {
    const e = element(by.css('app-webpage h1'));
    browser.wait(protractor.ExpectedConditions.presenceOf(e), jasmine.DEFAULT_TIMEOUT_INTERVAL);
    return e.getText();
  }
}
