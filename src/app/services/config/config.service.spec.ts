// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { ConfigService } from './config.service';

// eslint-disable-next-line max-lines-per-function
describe('ConfigService', () => {
  let service: ConfigService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ConfigService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      TestingCommon.disableLogging();

      readAll = service.fetchConfig('/config').catch();
      readAll = service.fetchConfig('/test-error').catch();
      readAll = service.fetchConfig().catch();

      const response = { status: 200, json: async () => { }, headers: new Headers() } as Response;
      response.headers.append('content-type', 'application/json');
      readAll = debugService.onResponse(response);

      readAll = debugService.onConfig({});
      readAll = debugService.onConfig({ test: true });

      readAll = debugService.onError({});

      TestingCommon.enableLogging();
    }).not.toThrowError();
  });
});
