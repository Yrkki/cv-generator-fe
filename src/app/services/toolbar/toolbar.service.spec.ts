// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';

import { ToolbarService } from './toolbar.service';
import { HttpClientModule } from '@angular/common/http';
import { TagCloudDisplayMode } from '../../enums/tag-cloud-display-mode.enum';

// eslint-disable-next-line max-lines-per-function
describe('ToolbarService', () => {
  let service: ToolbarService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ToolbarService,
      ]
    });
    service = TestBed.inject(ToolbarService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle decorations', () => {
    expect(() => {
      // service.LoadData();
      const value = service.decorations;
      service.decorations = true;
      service.decorations = false;
      service.decorations = value;
    }).not.toThrowError();
  });

  it('should toggle pagination', () => {
    expect(() => {
      // service.LoadData();
      const value = service.pagination;
      service.pagination = true;
      service.pagination = false;
      service.pagination = value;
    }).not.toThrowError();
  });

  it('should toggle tagCloud', () => {
    expect(() => {
      // service.LoadData();
      const value = service.tagCloud;
      service.tagCloud = TagCloudDisplayMode.tagCloud;
      service.tagCloud = TagCloudDisplayMode.chart;
      service.tagCloud = TagCloudDisplayMode.both;
      service.tagCloud = TagCloudDisplayMode.tagCloud;
      service.tagCloud = TagCloudDisplayMode.both;
      service.tagCloud = TagCloudDisplayMode.chart;
      service.tagCloud = TagCloudDisplayMode.tagCloud;
      service.tagCloud = value;
    }).not.toThrowError();
  });

  it('should toggle columns', () => {
    expect(() => {
      // service.LoadData();
      service.columns = service.columns;
    }).not.toThrowError();
  });

  it('should toggle responsive', () => {
    expect(() => {
      let readAll;
      readAll = service.responsive();
      readAll = service.responsive('Language');
      readAll = service.responsive('Project Summary');
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      service.model.entitiesModel.countCache = service.model.entitiesModel.countCache;

      let readAll;
      readAll = service.editMode;
      readAll = service.tagCloudIsTagCloud;

      readAll = service.chartService;
      readAll = service.persistenceService;
      readAll = service.model;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      const readAll = service.getColumnsClass('columns2');
    }).not.toThrowError();
  });

  it('should check public interface events', () => {
    expect(() => {
      service.responsiveModelChanged$.emit({ sourceEntityKey: 'Language', value: true });
    }).not.toThrowError();
  });
});
