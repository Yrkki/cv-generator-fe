import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  navigateToWebpage() {
    return browser.get('/Webpage');
  }

  getNameText() {
    return element(by.css('app-webpage h1')).getText();
  }
}
