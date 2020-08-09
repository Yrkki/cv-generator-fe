import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesheetsComponent } from './stylesheets.component';

describe('StylesheetsComponent', () => {
  let component: StylesheetsComponent;
  let fixture: ComponentFixture<StylesheetsComponent>;

  beforeEach(async(() => {
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
