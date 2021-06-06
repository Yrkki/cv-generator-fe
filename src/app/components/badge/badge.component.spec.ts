import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common.spec';

import { BadgeComponent } from './badge.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';

// eslint-disable-next-line max-lines-per-function
describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;
  let debugComponent: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeComponent],
      imports: [
        HttpClientTestingModule,
        AppModule,
        FormsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });

  it('should check lifecycle hooks', () => { expect(() => { TestingCommon.checkLifecycleHooks(component); }).not.toThrowError(); });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.key;
      readAll = component.replacementMap;
      readAll = component.linkLabel('');
      readAll = component.uiText('');

      debugComponent.replacementMap = { version: 'version' };
      readAll = component.preprocessUrl('{{ qualifiedHostname }}');

      const replacementMap = debugComponent.replacementMap;
      debugComponent.replacementMap = TestingCommon.decorateType(debugComponent.replacementMap);
      readAll = component.preprocessUrl('{{ qualifiedHostname }}');
      debugComponent.replacementMap = replacementMap;

      readAll = debugComponent.replaceAll('undefined', 'test', 'test');
    }).not.toThrowError();
  });
});
