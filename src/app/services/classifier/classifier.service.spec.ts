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
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take } from 'rxjs/operators';

import { Accomplishment } from '../../classes/accomplishment/accomplishment';

import { Go } from '../../enums/go.enum';

import { Course } from '../../interfaces/cv/course';

import { OntologyAdjusterService } from '../../services/ontology-adjuster/ontology-adjuster.service';
import { ClassifierService } from '../../services/classifier/classifier.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';

import { ModelModel } from '../../model/model/model.model';
import { MockDataService } from '../mock-data/mock-data.service';

// eslint-disable-next-line max-lines-per-function
describe('ClassifierService', () => {
  let service: ClassifierService;
  let debugService: any;
  let httpTestingController: HttpTestingController;

  let model: ModelModel;
  let dataService: MockDataService;

  let courses: Course[];

  // eslint-disable-next-line max-lines-per-function
  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ClassifierService,
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ClassifierService);

    TestBed.inject(OntologyAdjusterService);
    TestBed.inject(InputService);
    TestBed.inject(UiService);

    model = TestBed.inject(ModelModel);
    dataService = TestBed.inject(MockDataService);
    debugService = service as any;

    await dataService.getCv().pipe(take(1)).subscribe(async (cv: any) => {
      model.cv = cv;
      courses = dataService.getAmendedAccomplishments(cv);
      model.cv.Courses = courses;
    });
    await dataService.getOntology().pipe(take(1)).subscribe(async (ontology: any) => {
      service.ontologyService.ontology = ontology;
      service.ontologyService.ontologyAdjusterService.adjustOntology();
    });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public accomplishment types', () => {
    expect(() => {
      const accomplishment = new Accomplishment();

      let readAll;
      readAll = service.isCertification(accomplishment);
      readAll = service.isLanguage(accomplishment);
      readAll = service.isCourse(accomplishment);
      readAll = service.isHonorAndAward(accomplishment);
      readAll = service.isOrganization(accomplishment);
      readAll = service.isVolunteering(accomplishment);
      readAll = service.isInterestAndHobby(accomplishment);
      readAll = service.isVacation(accomplishment);
    }).not.toThrowError();
  });

  it('should check private accomplishment types', () => {
    expect(() => {
      const accomplishment = new Accomplishment();

      let readAll;
      readAll = debugService.isVolunteerWork(accomplishment);
      readAll = debugService.isVolunteeringInterest(accomplishment);
      readAll = debugService.isInterest(accomplishment);
      readAll = debugService.isHobby(accomplishment);
      readAll = debugService.isBreakInterest(accomplishment);
      readAll = debugService.isBreak(accomplishment);
      readAll = debugService.isArt(accomplishment);
      readAll = debugService.isLanguageCourse(accomplishment);
      readAll = debugService.isHonor(accomplishment);
      readAll = debugService.isAward(accomplishment);
      readAll = debugService.isAchievement(accomplishment);
    }).not.toThrowError();
  });

  it('should check next and next title methods', () => {
    expect(() => {
      let readAll;

      [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
        readAll = service.next(new MouseEvent('click'), _);
        readAll = service.nextTitle(_);
      });
    }).not.toThrowError();
  });

  it('should check next potential field method', () => {
    expect(() => {
      let readAll;

      [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
        readAll = debugService.nextPotentialField(0, _);
        readAll = debugService.nextPotentialField(0, _);
      });
    }).not.toThrowError();
  });

  it('should check nudge potential field to next adjacent one method', () => {
    expect(() => {
      let readAll;

      [undefined, Go.Home, Go.Back, Go.Forward].forEach((_) => {
        readAll = debugService.nudgePotentialField(0, _);
        readAll = debugService.nudgePotentialField(0, _);
      });
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;

      service.classifierKind = service.classifierKind;

      readAll = service.ClassifierKindValues;
      readAll = service.subService;

      readAll = service.ontologyService;
      readAll = service.persistenceService;
    }).not.toThrowError();
  });

  it('should check subService public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.subService;
      readAll = service.subService.prefix;
      readAll = service.subService.full;
      readAll = service.subService.sFull;
      readAll = service.subService.indexFull;
      [Go.Home, Go.Back, Go.Forward].forEach((_) => { readAll = service.subService.nextDirection[_]; });

      service.subService.classifierKind = service.subService.classifierKind;
      service.subService.defaultKind = service.subService.defaultKind;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;

      courses.forEach((course) => {
        readAll = service.isOfType(course, course.Type);
        readAll = service.isOfType(course, 'Other');
      });

      // readAll = service.rotateClassifierKind(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check private methods', () => {
    expect(() => {
      let readAll;

      service.ClassifierKindValues.forEach((classifierKind) => {
        service.classifierKind = classifierKind;

        courses.forEach((course) => {
          readAll = debugService.isOfProperCategory(course, course.Type, service.isCertification);
        });
      });

      readAll = debugService.clamp(11, 10);
      readAll = debugService.clamp(-11, 10);
      readAll = debugService.clamp(11, 0);
    }).not.toThrowError();
  });
});
