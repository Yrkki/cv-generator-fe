// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
/* eslint-disable max-len */
import { TestBed } from '@angular/core/testing';

import { LogUpdateService } from './log-update.service';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('LogUpdateService', () => {
  let service: LogUpdateService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ServiceWorkerModule.register('', { enabled: false }),
      ],
      providers: [
        LogUpdateService,
        SwUpdate,
      ]
    });
    service = TestBed.inject(LogUpdateService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
