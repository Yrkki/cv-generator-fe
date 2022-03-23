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

  // it('should check rotateClassifierKind', () => {
  //   expect(() => {
  //     // const readAll = component.rotateClassifierKind(new MouseEvent('click'));

  //     const target = component.classifierKind!.nativeElement!;
  //     target.click();
  //     target.classList.add('classifier');
  //     target.click();
  //     target.classList.add('clickableClassifierKind');
  //     target.click();
  //     target.parentElement!.classList.add('clickableClassifierKind');
  //     target.click();
  //     target.parentElement!.parentElement!.classList.add('clickableClassifierKind');
  //     target.click();

  //     component.portfolioService.engine.model.portfolioModel.filtered.Accomplishments = [];
  //     target.click();
  //   }).not.toThrowError();
  // });

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

      readAll = model.classifierService;
    }).not.toThrowError();
  });

  it('should check private interface properties', () => {
    expect(() => {
      const readAll = (model as any).entitiesModel;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      const readAll = model.ReclassifyAccomplishments();
    }).not.toThrowError();
  });
});
