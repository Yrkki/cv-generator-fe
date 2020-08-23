import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { GeolocationComponent } from './geolocation.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GeolocationComponent', () => {
  let component: GeolocationComponent;
  let fixture: ComponentFixture<GeolocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocationComponent ],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      component.Geolocation = component.Geolocation;

      let readAll;
      readAll = component.divider;
      readAll = component.GeolocationCity;
      readAll = component.GeolocationCountry;
      readAll = component.GeolocationFlag;
      readAll = component.GeolocationFlagEmoji;
      readAll = component.GeolocationFlagEu;
      readAll = component.GeolocationFlagEuEmoji;
      readAll = component.GeolocationIP;
      readAll = component.GeolocationIpType;
      readAll = component.GeolocationIsEu;
      readAll = component.GeolocationUrl;
      readAll = component.ShowDivider = false;
      readAll = component.space;
    }).not.toThrowError();
  });
});
