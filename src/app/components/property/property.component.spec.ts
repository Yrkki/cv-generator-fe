// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyComponent } from './property.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should create with no params', () => {
    expect(() => {
      const readAll = new PropertyComponent(
        TestBed.inject(PortfolioService),
        TestBed.inject(InputService),
        TestBed.inject(UiService),
        TestBed.inject(DataService),
        TestBed.inject(ExcelDateFormatterService),
        undefined,
      );
    }).not.toThrowError();
  });

  it('should check description', () => {
    expect(() => {
      let readAll;

      component.propertyName.Description = undefined;
      readAll = component.description;
      component.propertyName.Description = new Array();
      readAll = component.description;
      component.propertyName.Description = 'description';
      readAll = component.description;
      component.propertyName.Description = [component.propertyName.Description];
      readAll = component.description;
      component.propertyName = { Description: 'description' };
      readAll = component.description;
      component.propertyName = { Description: ['description'] };
      readAll = component.description;
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;

      readAll = component.detailBullet;
      readAll = component.detailIndent;

      component.dateFormat = component.dateFormat;
      const getItem = component.portfolioService.persistenceService.getItem;
      component.portfolioService.persistenceService.getItem = () => null;
      component.dateFormat = component.dateFormat;
      component.portfolioService.persistenceService.getItem = getItem;

      for (let index = 0; index < 4; index++) {
        component.rotateDateFormat();
      }
      component.dateFormat = '';
      component.rotateDateFormat();
    }).not.toThrowError();
  });
});
