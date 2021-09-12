// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';

import { AccomplishmentsService } from './accomplishments.service';

describe('AccomplishmentsService', () => {
  let service: AccomplishmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccomplishmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.projectsAccomplishmentShouldCollapseState;
      readAll = service.projectsAccomplishmentClassList;
    }).not.toThrowError();
  });
});
