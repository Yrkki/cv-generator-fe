import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { HeaderTitleComponent } from './header-title.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeaderTitleComponent', () => {
  let component: HeaderTitleComponent;
  let fixture: ComponentFixture<HeaderTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderTitleComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });

  it('should check lifecycle hooks', () => { expect(() => { TestingCommon.checkLifecycleHooks(component); }).not.toThrowError(); });

  it('should simulate mouse click', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClick([component.clickable]);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the extra-functions controls', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard([component.clickable]);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.entities;
      readAll = component.entity;
      readAll = component.key;
      readAll = component.nextSortElement;
      readAll = component.sorterKind;
      readAll = component.count;

      readAll = component.clickable;
      readAll = component.sorter;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });
});
