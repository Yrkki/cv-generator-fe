import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyComponent } from './property.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('PropertyComponent', () => {
  let component: PropertyComponent;
  let fixture: ComponentFixture<PropertyComponent>;

  beforeEach(async(() => {
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
  }));

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
      let readAll;
      readAll = component.entities;
    }).not.toThrowError();
  });

  it('should check ui', () => {
    expect(() => {
      let readAll;
      readAll = component.ui;
    }).not.toThrowError();
  });

  it('should check getBackgroundLogoImageUri', () => {
    expect(() => {
      let readAll;
      readAll = component.getBackgroundLogoImageUri('');
    }).not.toThrowError();
  });

  it('should check getSafeUri', () => {
    expect(() => {
      let readAll;
      readAll = component.getSafeUri('');
    }).not.toThrowError();
  });

  it('should check getJsDateValueFromExcel', () => {
    expect(() => {
      let readAll;
      readAll = component.getJsDateValueFromExcel(12345);
    }).not.toThrowError();
  });

  it('should check linkLabel', () => {
    expect(() => {
      let readAll;
      readAll = component.linkLabel('');
    }).not.toThrowError();
  });
});
