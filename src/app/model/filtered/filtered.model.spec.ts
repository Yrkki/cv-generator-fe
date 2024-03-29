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

import { FilteredModel } from './filtered.model';

import { Course } from '../../interfaces/cv/course';

// eslint-disable-next-line max-lines-per-function
describe('FilteredModel', () => {
  let model: FilteredModel;
  let debugModel: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    model = TestBed.inject(FilteredModel);
    debugModel = model as any;
  });

  it('should be created', () => {
    expect(model).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      const readAll = model.filtered;
      model.searchToken = model.searchToken;
    }).not.toThrowError();
  });

  it('should check private interface properties', () => {
    expect(() => {
      [
        [],
        [
          { Type: 'Course' },
          { Type: 'Organization' },
        ]
      ].forEach((_) => {
        debugModel.all = _ as Course[];
      });
    }).not.toThrowError();
  });
});
