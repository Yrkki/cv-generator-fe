import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { FooterComponent } from './footer.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
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
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => {
      component.Initialize();
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at entities header', () => {
    expect(() => {
      TestingCommon.shouldSimulateMouseClickUsingKeyboard(component.clickable);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      TestingCommon.shouldCheckPublicInterface(component);

      let readAll;
      readAll = component.version;
      readAll = component.Config;
      readAll = component.LeavesCount;
      readAll = component.getAssetUri('');
      readAll = component.linkLabel('');
      readAll = component.tabName('');
      readAll = component.trackByFn(0, 0);
      readAll = component.preprocessUrl('{{ qualifiedHostname }}');
    }).not.toThrowError();
  });
});
