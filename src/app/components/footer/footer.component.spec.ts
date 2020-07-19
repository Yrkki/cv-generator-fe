import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { FooterComponent } from './footer.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        FooterComponent,
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
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should toggle ExpandBadges', () => {
    expect(() => {
      const value = component.ExpandBadges;
      component.expandBadgesElement?.nativeElement?.click();
      component.expandBadgesElement?.nativeElement?.click();
      component.ExpandBadges = value;
    }).not.toThrowError();
  });

  it('should check lifecycle hooks', () => {
    expect(() => {
      TestingCommon.checkLifecycleHooks(component);
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.version;
      readAll = component.ui;
      readAll = component.entities;
      readAll = component.decorations;
      readAll = component.BadgeConfig;
      readAll = component.BadgeLeavesCount;
      readAll = component.uiText('');
      readAll = component.isEmpty({});
      readAll = component.getAssetUri('');
      readAll = component.label('');
      readAll = component.linkLabel('');
      readAll = component.tabName('');
      readAll = component.uiText('');
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at entities header', () => {
    expect(() => {
      component.clickable?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the expand badges decorated button', () => {
    expect(() => {
      component.clickableExpandBadgesDecorated?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the expand badges button', () => {
    expect(() => {
      component.clickableExpandBadges?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });
});
