import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { ProjectContributionsComponent } from './project-contributions.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('ProjectContributionsComponent', () => {
  let component: ProjectContributionsComponent;
  let fixture: ComponentFixture<ProjectContributionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        ProjectContributionsComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContributionsComponent);
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
      readAll = fixture.componentInstance.dateFormat;
      readAll = component.entities;
      readAll = component.ui;
      readAll = component.filtered;
      readAll = component.dateFormat;
      readAll = component.componentName;
      readAll = component.getProjectIsOnePersonTeam({});
      readAll = component.getDecryptedProjectPeriod({});
      readAll = component.getJsDateValueFromExcel(12345);
      readAll = component.toTitleCase('test');
      readAll = component.trackByFn(0, 0);

      readAll = component.truncated([]);
      readAll = component.remaining([]);
    }).not.toThrowError();
  });
});
