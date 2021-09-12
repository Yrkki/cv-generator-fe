// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { ProjectCardComponent } from './project-card.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { Project } from '../../interfaces/project/project';
import { Entity } from '../../interfaces/entities/entity';

// eslint-disable-next-line max-lines-per-function
describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        ProjectCardComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.dateFormat;

      readAll = component.projectProjectLinkUri;
      const links = 'Links';
      (component.propertyName as Project)[links] = 'links';
      readAll = component.projectProjectLinkUri;

      readAll = component.idesAndTools;
      const idesAndTools = 'IDEs and Tools';
      component.entities[idesAndTools] = { node: idesAndTools } as Entity;
      readAll = component.idesAndTools;

      readAll = component.getProjectLogoUri('');
      readAll = component.tabName('');
      readAll = component.isEmptyProjectProjectImage('');
      readAll = component.getDecryptedProjectPeriod({} as Project);

      readAll = component.getProjectProjectImageUri('');
      readAll = component.getProjectProjectImageUri('', true);
    }).not.toThrowError();
  });
});
