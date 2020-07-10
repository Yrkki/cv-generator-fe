import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContributionsComponent } from './project-contributions.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('ProjectContributionsComponent', () => {
  let component: ProjectContributionsComponent;
  let fixture: ComponentFixture<ProjectContributionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        ProjectContributionsComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = fixture.debugElement.componentInstance.dateFormat;
      readAll = component.entities;
      readAll = component.ui;
      readAll = component.toTitleCase('test');
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });
});
