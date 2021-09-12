// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesheetsComponent } from './stylesheets.component';

describe('StylesheetsComponent', () => {
  let component: StylesheetsComponent;
  let fixture: ComponentFixture<StylesheetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StylesheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
