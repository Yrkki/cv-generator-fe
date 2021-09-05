import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateComponent } from './corporate.component';
import { SocBarComponent } from '../soc-bar/soc-bar.component';

import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

// eslint-disable-next-line max-lines-per-function
describe('CorporateComponent', () => {
  let component: CorporateComponent;
  let fixture: ComponentFixture<CorporateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        SocBarComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateComponent);
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
      const readAll = component.setTitle('CV Generator');
    }).not.toThrowError();
  });
});
