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

import { Entities } from '../../classes/entities/entities';
import { Accomplishment } from '../../classes/accomplishment/accomplishment';

import { ClassifierService } from '../classifier/classifier.service';
import { MockDataService } from '../mock-data/mock-data.service';

// eslint-disable-next-line max-lines-per-function
describe('ClassifiableService', () => {
  let service: ClassifierService;
  let dataService: MockDataService;
  let debugService: any;
  let httpTestingController: HttpTestingController;
  let entities: Entities;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ClassifierService,
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ClassifierService);
    dataService = TestBed.inject(MockDataService);
    debugService = service as any;

    await dataService.getEntities().pipe(take(1)).subscribe((e: any) => {
      e = e as Entities;
      for (const key in e) {
        if (Object.prototype.hasOwnProperty.call(e, key)) { e[key].key = key; }
      }
      entities = e;
    });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public accomplishment types', () => {
    expect(() => {
      const accomplishment = new Accomplishment();

      let readAll;

      service.ClassifierKindValues.forEach((classifierKind) => {
        service.classifierKind = classifierKind;

        readAll = service.isLanguage(accomplishment);
        readAll = service.isCourse(accomplishment);
        readAll = service.isPublication(accomplishment);
        readAll = service.isCertification(accomplishment);
        readAll = service.isHonorAndAward(accomplishment);
        readAll = service.isOrganization(accomplishment);
        readAll = service.isVolunteering(accomplishment);
        readAll = service.isInterestAndHobby(accomplishment);
        readAll = service.isVacation(accomplishment);
      });
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      service.classifierKind = service.classifierKind;

      const readAll = service.persistenceService;
    }).not.toThrowError();
  });
});
