// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LocalizationService } from './localization.service';

// eslint-disable-next-line max-lines-per-function
describe('LocalizationService', () => {
  let service: LocalizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(LocalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.nonBreakingSpace;
      readAll = service.dateFormatShort;
      readAll = service.dateFormatMiddle;
      readAll = service.dateFormatFull;
      readAll = service.dateFormatLong;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.dateFormatLonger(false);
      readAll = service.dateFormatShorter(false);
    }).not.toThrowError();
  });
});
