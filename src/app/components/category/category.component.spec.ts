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

import { CategoryComponent } from './category.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { Cv as ICv } from '../../interfaces/cv/cv';
import { Course } from '../../interfaces/cv/course';

import { OntologyAdjusterService } from '../../services/ontology-adjuster/ontology-adjuster.service';
import { ClassifierService } from '../../services/classifier/classifier.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { MockDataService } from '../../services/mock-data/mock-data.service';
import { take } from 'rxjs/operators';

// eslint-disable-next-line max-lines-per-function
describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<CategoryComponent>;

  let classifierService: ClassifierService;
  let portfolioModel: PortfolioModel;
  let dataService: MockDataService;

  let courses: Course[];

  // eslint-disable-next-line max-lines-per-function
  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        CategoryComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
    TestBed.inject(OntologyAdjusterService);
    classifierService = TestBed.inject(ClassifierService);
    TestBed.inject(InputService);
    TestBed.inject(UiService);
    portfolioModel = TestBed.inject(PortfolioModel);
    dataService = TestBed.inject(MockDataService);

    dataService = TestBed.inject(MockDataService);

    await dataService.getCv().pipe(take(1)).subscribe(async (cv: any) => {
      portfolioModel.cv = cv;
      courses = dataService.getAmendedAccomplishments(cv);
      portfolioModel.cv.Courses = courses;
    });
    await dataService.getOntology().pipe(take(1)).subscribe(async (ontology: any) => {
      classifierService.ontologyService.ontology = ontology;
      classifierService.ontologyService.ontologyAdjusterService.adjustOntology();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
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
      TestingCommon.shouldSimulateMouseClick([component.clickableClassifierKind, component.clickableChangeOntologyStructure]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickableClassifierKind, component.clickableChangeOntologyStructure]);
    }).not.toThrowError();
  });

  it('should check trackByFn', () => {
    expect(() => {
      const readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });

  it('should try dispatch ChangeOntologyStructure click event', () => {
    expect(() => {
      const element = component.clickableChangeOntologyStructure?.nativeElement;
      if (element) {
        const handler = (event: MouseEvent) => component.changeOntologyStructure(event);
        element.addEventListener('click', handler);
        element.click();
        element.removeEventListener('click', handler);
      }
    }).not.toThrowError();
  });

  // eslint-disable-next-line max-lines-per-function
  it('should check dependent properties', () => {
    expect(() => {
      let readAll;
      const dependencies = {
        editMode: component.portfolioService.toolbarService.editMode.toString(),
        classifierKind: component.classifierService.classifierKind
      };

      courses.forEach((course) => {
        component.propertyName = course;
        fixture.detectChanges();

        [true, false].forEach((editMode) => {
          component.portfolioService.persistenceService.setItem('edit mode', editMode.toString());
          component.classifierService.ClassifierKindValues.forEach((classifierKind) => {
            component.classifierService.classifierKind = classifierKind;
            readAll = component.platformVisible;
            readAll = component.typeVisible;
          });
          readAll = component.colorVisible;
        });
      });

      component.portfolioService.persistenceService.setItem('edit mode', dependencies.editMode);
      component.classifierService.classifierKind = dependencies.classifierKind;
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      courses.forEach((course) => {
        component.propertyName = course;
        fixture.detectChanges();

        readAll = component.propertyName;
        readAll = component.ontologyParents;
        readAll = component.ontologyEntry;
        readAll = component.platform;
        readAll = component.category;
        readAll = component.ontologyColor;
        readAll = component.color;
        readAll = component.ClassifierKind;
      });

      readAll = component.portfolioService;
      readAll = component.classifierService;
      readAll = component.inputService;
      readAll = component.uiService;
    }).not.toThrowError();
  });

  it('should check private interface properties', () => {
    expect(() => {
      let readAll;

      courses.forEach((course) => {
        component.propertyName = course;
        fixture.detectChanges();

        readAll = debugComponent.multiParents;

        readAll = debugComponent.ontologyAdjusterService;
      });
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;

      readAll = component.getOntologyEntryProperty('Webinar', 'category');
      readAll = component.getOntologyEntryProperty('nothing', 'category');

      courses.forEach((course) => {
        component.propertyName = course;
        fixture.detectChanges();

        readAll = component.onMouseEnter(new MouseEvent('mouseenter'));
        readAll = component.clickableChangeOntologyStructure?.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

        readAll = component.changeOntologyStructure(new MouseEvent('click'));
        readAll = component.clickableClassifierKind?.nativeElement.click();
      });
      readAll = component.nextTitle();
    }).not.toThrowError();
  });
});
