// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Context } from '../../interfaces/context/context';
import { ContextConfiguration } from '../../interfaces/context/context-configuration';

import { ContextService } from './context.service';

// eslint-disable-next-line max-lines-per-function
describe('ContextService', () => {
  let service: ContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      service.contexts = service.contexts;
      service.isEditing = service.isEditing;
      service.navState = service.navState;
      readAll = service.navStateConfigurations;
      readAll = service.navStatePersistenceKey;
      readAll = service.persistenceService;
      service.selectedContext = service.selectedContext;
      readAll = service.uiService;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      const context: Context = {
        id: 555,
        name: 'context name',
        storage: {} as Storage
      };
      readAll = service.contextEquals(context, context);
      readAll = service.getCaption(context);
      readAll = service.getTitle(context);
    }).not.toThrowError();
  });

  it('should check public interface events', () => {
    expect(() => {
      const contextConfiguration: ContextConfiguration = {
        width: '10px',
        backgroundColor: 'blue',
        name: () => 'context service context configuration name'
      };
      service.navStateChanged$.emit(contextConfiguration);
    }).not.toThrowError();
  });
});
