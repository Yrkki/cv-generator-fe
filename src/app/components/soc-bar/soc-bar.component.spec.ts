import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { SocBarComponent } from './soc-bar.component';

// eslint-disable-next-line max-lines-per-function
describe('SocBarComponent', () => {
  let component: SocBarComponent;
  let debugComponent: any;
  let fixture: ComponentFixture<SocBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SocBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocBarComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
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

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;

      component.barTypeCorporate = component.barTypeCorporate;

      readAll = component.uiService;

      readAll = component.socBar;
      readAll = component.corporateBar;

      readAll = debugComponent.address;
      readAll = debugComponent.phone;
      readAll = debugComponent.email;
      readAll = debugComponent.web;

      readAll = debugComponent.corporateAddress;
      readAll = debugComponent.corporateAddressLink;
      readAll = debugComponent.corporatePhone;
      readAll = debugComponent.corporateEmail;
      readAll = debugComponent.corporateWeb;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = component.linkLabel('');
      readAll = component.cleanProtocol('http://google.com');
      readAll = component.cleanProtocol('https://google.com');
    }).not.toThrowError();
  });
});
