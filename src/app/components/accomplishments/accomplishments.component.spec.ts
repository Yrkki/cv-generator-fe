import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { AccomplishmentsComponent } from './accomplishments.component';

import { AppModule } from '../../app.module';

describe('AccomplishmentsComponent', () => {
  let component: AccomplishmentsComponent;
  let fixture: ComponentFixture<AccomplishmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccomplishmentsComponent],
      imports: [
        AppModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomplishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickableAccomplishments?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));

      // component.clickableCertifications?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      // component.clickableLanguages?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      // component.clickableCourses?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      // component.clickableCourseIndex?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      // component.clickableCourse?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableOrganizations?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableOrganizationIndex?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      component.clickableOrganization?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));

      const headers = document.getElementsByClassName('header');
      Array.from(headers).forEach((el) => {
        el.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
        console.log(el.tagName);
      });
      // for (const accomplishmentType of ['']) {
      //   for (const viewType of ['s', 'Index', 'List', 'Chart']) {
      //     component.['clickable' + accomplishmentType + viewType]?.nativeElement
      //       .dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
      //   }
      // }
    }).not.toThrowError();
  });

  it('should check updateShouldCollapseProjectsAccomplishmentHandler handler', () => {
    expect(() => {
      let readAll;
      readAll = component.updateShouldCollapseProjectsAccomplishmentHandler(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.updateShouldCollapseProjectsAccomplishment('Accomplishments');
      readAll = component.projectsDefined();
      readAll = component.filtered;
      readAll = component.filtered.Accomplishments;

      readAll = component.filtered.Languages;
      readAll = component.filtered.Certifications;
      readAll = component.filtered.Courses;
      readAll = component.filtered.Organizations;
      readAll = component.filtered.Volunteering;

      readAll = component.filtered.Projects;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;
      readAll = component.tabName('');
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });
});
