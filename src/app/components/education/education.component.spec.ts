import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { EducationComponent } from './education.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        EducationComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have school detail', () => {
    expect(component.schoolDetail({
      'Id': 1,
      'From': 34728,
      'To': 37229,
      'School': 'Lorem ipsum dolor sit amet, con',
      'Field': 'Lorem ipsum dolor',
      'Major': 'Lorem ipsum dolor sit amet, cons',
      'Degree': '',
      'Honors': '',
      'Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ',
      'Link': 'Lorem ipsum dolor sit amet',
      'Image': 'Lorem ipsum dolor sit amet',
      'Color': '#008080C0',
      'Highlight': '',
      'Grade': ''
    })).toBeTruthy();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check dateFormat', () => {
    expect(() => {
      let readAll;
      readAll = component.dateFormat;
    }).not.toThrowError();
  });

  it('should check trackByFn', () => {
    expect(() => {
      let readAll;
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
    }).not.toThrowError();
  });
});
