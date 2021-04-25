import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { UiService } from './ui.service';
import { StringExService } from '../../services/string-ex/string-ex.service';

// eslint-disable-next-line max-lines-per-function
describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(UiService);
    service.windowReload = TestingCommon.mockWindowReload;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check ui', () => { expect(() => { const readAll = service.ui; }).not.toThrowError(); });

  it('should check tabName', () => { expect(() => { const readAll = service.tabName('key'); }).not.toThrowError(); });
  it('should check linkLabel', () => { expect(() => { const readAll = service.linkLabel('key'); }).not.toThrowError(); });
  it('should check label', () => { expect(() => { const readAll = service.label('key'); }).not.toThrowError(); });

  it('should check public interface falsy methods', () => {
    expect(() => {
      const readAll = service.linkLabel(undefined);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.componentName;
      readAll = service.frequenciesDivider;
      readAll = service.linkToThisSymbol;
      readAll = service.nonBreakingSpace;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.uiText('');
      readAll = service.windowReload();
    }).not.toThrowError();
  });

  it('should check replaceAll', () => {
    expect(() => {
      const readAll = StringExService.replaceAll('undefined', 'test', 'test');
    }).not.toThrowError();
  });

  it('should check public interface events', () => {
    expect(() => {
      service.uiInvalidated$.emit(true);
    }).not.toThrowError();
  });
});
