// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ModelModel } from './model.model';

// eslint-disable-next-line max-lines-per-function
describe('ModelModel', () => {
  let model: ModelModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    model = TestBed.inject(ModelModel);
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
      model.countCache = model.countCache;

      readAll = model.entitiesModel;
      readAll = model.portfolioModel;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });
});
