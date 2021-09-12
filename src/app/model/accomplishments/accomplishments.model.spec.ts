// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AccomplishmentsModel } from './accomplishments.model';

// eslint-disable-next-line max-lines-per-function
describe('AccomplishmentsModel', () => {
  let model: AccomplishmentsModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    model = TestBed.inject(AccomplishmentsModel);
  });

  it('should be created', () => {
    expect(model).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
      model.projectsAccomplishmentShouldCollapseState = model.projectsAccomplishmentShouldCollapseState;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });
});
