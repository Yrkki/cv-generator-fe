// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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
