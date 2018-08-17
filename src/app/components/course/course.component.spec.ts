import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComponent } from './course.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

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

  it('should check public interface', () => {
    expect(() => {
      const accomplishment = {
            "Started": 43326,
            "Completed": 43327
          };
      const readAll = {
        'sameFormattedDate': component.sameFormattedDate(accomplishment),
        'started': component.started(accomplishment),
        'completed': component.completed(accomplishment),
        'getAccomplishmentAuthorityImageUri': component.getAccomplishmentAuthorityImageUri(''),
        'getAccomplishmentCertificateImageUri': component.getAccomplishmentCertificateImageUri(''),
        'getAccomplishmentCertificateImageUri full': component.getAccomplishmentCertificateImageUri('', true),
        'getAccomplishmentCertificateLogoImageUri': component.getAccomplishmentCertificateLogoImageUri(''),
        'getAccomplishmentCertificateLogoImageUri full': component.getAccomplishmentCertificateLogoImageUri('', true)
      };
    }).not.toThrowError();
  });
});
