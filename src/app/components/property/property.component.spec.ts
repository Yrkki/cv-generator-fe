import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyComponent } from './property.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

// eslint-disable-next-line max-lines-per-function
describe('PropertyComponent', () => {
  let component: PropertyComponent;
  let fixture: ComponentFixture<PropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        PropertyComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check entities', () => {
    expect(() => {
      const readAll = component.entities;
    }).not.toThrowError();
  });

  it('should check ui', () => {
    expect(() => {
      const readAll = component.ui;
    }).not.toThrowError();
  });

  it('should check getBackgroundLogoImageUri', () => {
    expect(() => {
      const readAll = component.getBackgroundLogoImageUri('');
    }).not.toThrowError();
  });

  it('should check getSafeUri', () => {
    expect(() => {
      const readAll = component.getSafeUri('');
    }).not.toThrowError();
  });

  it('should check getJsDateValueFromExcel', () => {
    expect(() => {
      const readAll = component.getJsDateValueFromExcel(12345);
    }).not.toThrowError();
  });

  it('should check linkLabel', () => {
    expect(() => {
      const readAll = component.linkLabel('');
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.description;
      readAll = component.detailBullet;
      readAll = component.detailIndent;

      component.dateFormat = component.dateFormat;

      for (let index = 0; index < 4; index++) {
        component.rotateDateFormat();
      }
    }).not.toThrowError();
  });
});
