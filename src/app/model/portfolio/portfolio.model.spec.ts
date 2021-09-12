// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { PortfolioModel } from './portfolio.model';

// eslint-disable-next-line max-lines-per-function
describe('PortfolioModel', () => {
  let model: PortfolioModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    model = TestBed.inject(PortfolioModel);
  });

  it('should be created', () => {
    expect(model).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = model.cv;
      readAll = model.entities;
      readAll = model.projects;
      readAll = model.ui;
      readAll = model.generalTimeline;
      readAll = model.filtered;
      model.searchToken = model.searchToken;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });
});
