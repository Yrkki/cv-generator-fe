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
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { CourseComponent } from './course.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { MockDataService } from '../../services/mock-data/mock-data.service';
import { take } from 'rxjs/operators';

// eslint-disable-next-line max-lines-per-function
describe('CourseComponent', () => {
  let component: CourseComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<CourseComponent>;

  let portfolioModel: PortfolioModel;
  let dataService: MockDataService;

  // eslint-disable-next-line max-lines-per-function
  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        CourseComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    portfolioModel = TestBed.inject(PortfolioModel);
    dataService = TestBed.inject(MockDataService);

    await dataService.getCv().pipe(take(1)).subscribe(async (cv: any) => {
      portfolioModel.cv = cv;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;

    component.propertyName = portfolioModel.cv.Courses[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should simulate mouse click', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClick([component.clickableDateFormat]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickableDateFormat]);
    }).not.toThrowError();
  });

  it('should check public image uri methods', () => {
    expect(() => {
      let readAll;
      readAll = component.getAccomplishmentAuthorityImageUri('');
      [false, true, undefined].forEach((_) => readAll = component.getAccomplishmentCertificateImageUri('', _));
      [false, true, undefined].forEach((_) => readAll = component.getAccomplishmentCertificateLogoImageUri('', _));
      readAll = component.getBackgroundLogoImageUri('');
    }).not.toThrowError();
  });

  it('should check public accomplishment date', () => {
    expect(() => {
      const accomplishment = component.propertyName;
      const readAll = component.sameFormattedDate(accomplishment);
    }).not.toThrowError();
  });

  it('should check public accomplishment period', () => {
    expect(() => {
      const accomplishment = component.propertyName;

      let readAll;
      readAll = component.started(accomplishment);
      readAll = component.completed(accomplishment);

      readAll = component.expired(accomplishment);
      readAll = component.expiresLabel(accomplishment);
      accomplishment.Expiration = true;
      readAll = component.expired(accomplishment);
      readAll = component.expiresLabel(accomplishment);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;

      readAll = component.showLevel;
      component.propertyName.Type = 'non-type';
      component.propertyName.Level = 'Advanced';
      readAll = component.showLevel;

      readAll = component.level;

      readAll = component.datePipe;
      readAll = component.portfolioService;
      readAll = component.inputService;
      readAll = component.uiService;
      readAll = component.dataService;
      readAll = component.excelDateFormatterService;
      readAll = component.params;

      // inherited
      readAll = component.ui;
    }).not.toThrowError();
  });

  it('should check private interface properties', () => {
    expect(() => {
      let readAll;

      readAll = component.level;
      readAll = debugComponent.levelPresent;

      component.propertyName.Level = '';
      readAll = component.level;
      readAll = debugComponent.levelPresent;

      [true, false].forEach((value) => {
        component.portfolioService.model.portfolioModel.classifierService.isCourse = () => value;
        component.propertyName.Level = 'Advanced';
        readAll = component.level;
      });

      readAll = debugComponent.type;
      readAll = debugComponent.defaultDateFormat;
    }).not.toThrowError();
  });
});
