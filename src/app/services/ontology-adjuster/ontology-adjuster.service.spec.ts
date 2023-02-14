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

import { OntologyAdjusterService } from './ontology-adjuster.service';
import { MockDataService } from '../mock-data/mock-data.service';

// eslint-disable-next-line max-lines-per-function
describe('OntologyAdjusterService', () => {
  let service: OntologyAdjusterService;
  let dataService: MockDataService;
  let debugService: any;
  let httpTestingController: HttpTestingController;
  let entities: Entities;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OntologyAdjusterService,
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(OntologyAdjusterService);
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

  it('should check public interface properties', () => {
    expect(() => {
      service.ontology = service.ontology;
    }).not.toThrowError();
  });

  it('should check private interface properties', () => {
    expect(() => {
      const readAll = debugService.separator;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.adjustOntology();
      readAll = service.recalculateOntology();

      readAll = service.calculatePath();
      const ontologyEntry = service.ontology[1];
      readAll = service.calculatePath(ontologyEntry);

      readAll = debugService.crawlingOntologyEntries(undefined, []);
      readAll = debugService.crawlingOntologyEntries(ontologyEntry, []);

      const nextOntologyEntry = service.ontology.find((_) => _.Entity === ontologyEntry.selectedParent);
      if (nextOntologyEntry) {
        readAll = debugService.classifyOntologyEntryAccordingToCore(nextOntologyEntry, ontologyEntry);
      }
    }).not.toThrowError();
  });

  it('should check private interface methods', () => {
    expect(() => {
      let readAll;

      readAll = debugService.trimOntologyEntry({});
      readAll = debugService.trimOntologyEntry({ Entity: ' content ' });
      readAll = debugService.trimOntologyEntry({ Parent: ' content ' });
      readAll = debugService.trimOntologyEntry({ Color: ' content ' });
      readAll = debugService.trimOntologyEntry({ MultiParent: ' content ' });
    }).not.toThrowError();
  });
});
