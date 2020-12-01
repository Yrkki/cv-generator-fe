import { TestBed } from '@angular/core/testing';

import { UiService } from './ui.service';
import { HttpClientModule } from '@angular/common/http';

describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check ui', () => { expect(() => { service.ui = service.ui; }).not.toThrowError(); });

  it('should check dateFormatShort', () => { expect(() => { const readAll = service.dateFormatShort; }).not.toThrowError(); });
  it('should check dateFormatMiddle', () => { expect(() => { const readAll = service.dateFormatMiddle; }).not.toThrowError(); });
  it('should check dateFormatLong', () => { expect(() => { const readAll = service.dateFormatLong; }).not.toThrowError(); });

  it('should check dateFormatShorter', () => {
    expect(() => { const readAll = service.dateFormatShorter(true); }).not.toThrowError();
    expect(() => { const readAll = service.dateFormatShorter(false); }).not.toThrowError();
  });
  it('should check dateFormatLonger', () => {
    expect(() => { const readAll = service.dateFormatLonger(true); }).not.toThrowError();
    expect(() => { const readAll = service.dateFormatLonger(false); }).not.toThrowError();
  });

  it('should check tabName', () => { expect(() => { const readAll = service.tabName('key'); }).not.toThrowError(); });
  it('should check linkLabel', () => { expect(() => { const readAll = service.linkLabel('key'); }).not.toThrowError(); });
  it('should check label', () => { expect(() => { const readAll = service.label('key'); }).not.toThrowError(); });
  // ...

  it('should check getSafeUri', () => {
    expect(() => {
      let readAll;
      readAll = service.getSafeUri('');

      const searchText = service?.ui?.Search;
      if (searchText) { searchText.text = searchText.text === 'Search' ? 'EncryptedSearch' : 'Search'; }
      readAll = service.getSafeUri('');
    }).not.toThrowError();
  });

  it('should check public interface falsy methods', () => {
    expect(() => {
      let readAll;
      readAll = service.linkLabel(undefined);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.componentName;
      readAll = service.frequenciesDivider;
      readAll = service.linkToThisSymbol;
      readAll = service.nonBreakingSpace;

      readAll = service.linkToThisText;
      readAll = service.placeholderImageName;
      readAll = service.placeholderImage;
      readAll = service.dataEncrypted;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.tabName('key');
      readAll = service.getAssetUri('imageName');
      readAll = service.getProjectProjectImageUri('imageName');
      readAll = service.getProjectProjectImageUri('imageName', true);
      readAll = service.getBackgroundLogoImageUri('imageName');

      readAll = service.uiText('');

      readAll = service.isEmptyProjectProjectImage('imageName');
      readAll = service.dateFormatLonger(false);
    }).not.toThrowError();
  });

  it('should check replaceAll', () => {
    expect(() => {
      let readAll;
      readAll = service.replaceAll('undefined', 'test', 'test');
    }).not.toThrowError();
  });
});
