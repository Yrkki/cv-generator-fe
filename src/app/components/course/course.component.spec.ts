import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComponent } from './course.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { Cv as CV } from '../../classes/cv/cv';
import { Course } from '../../interfaces/cv/course';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        CourseComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check public image uri methods', () => {
    expect(() => {
      const readAll = {
        'getAccomplishmentAuthorityImageUri': component.getAccomplishmentAuthorityImageUri(''),
        'getAccomplishmentCertificateImageUri': component.getAccomplishmentCertificateImageUri(''),
        'getAccomplishmentCertificateImageUri full': component.getAccomplishmentCertificateImageUri('', true),
        'getAccomplishmentCertificateLogoImageUri': component.getAccomplishmentCertificateLogoImageUri(''),
        'getAccomplishmentCertificateLogoImageUri full': component.getAccomplishmentCertificateLogoImageUri('', true)
      };
    }).not.toThrowError();
  });

  it('should check public accomplishment date', () => {
    expect(() => {
      const accomplishment = getAccomplishment();
      const readAll = {
        'sameFormattedDate': component.sameFormattedDate(accomplishment),
      };
    }).not.toThrowError();
  });

  it('should check public accomplishment period', () => {
    expect(() => {
      const accomplishment = getAccomplishment();
      const readAll = {
        'started': component.started(accomplishment),
        'completed': component.completed(accomplishment),
      };
    }).not.toThrowError();
  });

  function getAccomplishment() {
    const cv = new CV ();
    cv.Courses = [];
    cv.Courses.push ({
      'Authority URL': '',
      'Authority image': '',
      'Authority name': '',
      'Certificate URL': '',
      'Certificate image URL': '',
      'Certificate image': '',
      'Certificate logo': '',
      'Certificate number': '',
      'Certificate tag': '',
      'Expiration?': '',
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
  }
});
