import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComponent } from './course.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { Cv as CV } from '../../classes/cv/cv';

// eslint-disable-next-line max-lines-per-function
const getAccomplishment = () => {
  const cv = new CV();
  cv.Courses = [];
  cv.Courses.push({
    'Authority URL': '',
    'Authority image': '',
    'Authority name': '',
    'Certificate URL': '',
    'Certificate image URL': '',
    'Certificate image': '',
    'Certificate logo': '',
    'Certificate number': '',
    'Certificate tag': '',
    Expiration: '',
    Color: '',
    Completed: 43327,
    Id: 0,
    Level: '',
    Location: '',
    Name: '',
    Started: 43326,
    Type: '',
    URL: ''
  });

  return cv.Courses[0];
};

// eslint-disable-next-line max-lines-per-function
describe('CourseComponent', () => {
  let component: CourseComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        CourseComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check public image uri methods', () => {
    expect(() => {
      let readAll;
      readAll = component.getAccomplishmentAuthorityImageUri('');
      [false, true, undefined].forEach((_) => readAll = component.getAccomplishmentCertificateImageUri('', _));
      [false, true, undefined].forEach((_) => readAll = component.getAccomplishmentCertificateLogoImageUri('', _));
      readAll = component.getBackgroundLogoImageUri('');
    }).not.toThrowError();
  });

  it('should check public accomplishment date', () => {
    expect(() => {
      const accomplishment = getAccomplishment();
      const readAll = {
        sameFormattedDate: component.sameFormattedDate(accomplishment),
      };
    }).not.toThrowError();
  });

  it('should check public accomplishment period', () => {
    expect(() => {
      const accomplishment = getAccomplishment();

      let readAll;
      readAll = component.started(accomplishment);
      readAll = component.completed(accomplishment);

      readAll = component.expired(accomplishment);
      readAll = component.expiresLabel(accomplishment);
      accomplishment.Expiration = true;
      readAll = component.expired(accomplishment);
      readAll = component.expiresLabel(accomplishment);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;

      readAll = component.showLevel;
      component.propertyName.Type = 'non-type';
      component.propertyName.Level = 'Advanced';
      readAll = component.showLevel;

      readAll = component.ui;

      readAll = component.level;
      readAll = debugComponent.levelPresent;
      component.propertyName.Level = '';
      readAll = component.level;
      readAll = debugComponent.levelPresent;

      readAll = debugComponent.type;
      readAll = debugComponent.defaultDateFormat;
    }).not.toThrowError();
  });
});
