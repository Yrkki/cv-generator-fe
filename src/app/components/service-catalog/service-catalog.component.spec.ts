import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { ServiceCatalogComponent } from './service-catalog.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServiceCatalogComponent', () => {
  let component: ServiceCatalogComponent;
  let fixture: ComponentFixture<ServiceCatalogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceCatalogComponent],
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
    fixture = TestBed.createComponent(ServiceCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });

  it('should initialize', () => { expect(() => { component.Initialize(); }).not.toThrowError(); });

  it('should check lifecycle hooks', () => { expect(() => { TestingCommon.checkLifecycleHooks(component); }).not.toThrowError(); });

  it('should check public interface', () => {
    expect(() => {
      TestingCommon.shouldCheckPublicInterface(component);
    }).not.toThrowError();
  });
});
