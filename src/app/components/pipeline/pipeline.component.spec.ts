import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { PipelineComponent } from './pipeline.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PipelineComponent', () => {
  let component: PipelineComponent;
  let fixture: ComponentFixture<PipelineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PipelineComponent],
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
    fixture = TestBed.createComponent(PipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(() => { component.Initialize(); }).not.toThrowError();
  });

  it('should toggle Expand', () => {
    expect(() => {
      const value = component.Expand;
      component.expandElement?.forEach(_ => _.nativeElement.click());
      component.expandElement?.forEach(_ => _.nativeElement.click());
      component.Expand = value;
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
      readAll = component.key;
      readAll = component.expandKey;
      readAll = component.Config;
      readAll = component.LeavesCount;
      readAll = component.uiText('');
      readAll = component.isEmpty({});
      readAll = component.getAssetUri('');
      readAll = component.label('');
      readAll = component.linkLabel('');
      readAll = component.tabName('');
      readAll = component.uiText('');
      readAll = component.trackByFn(0, 0);
      readAll = component.preprocessUrl('{{ qualifiedHostname }}');
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at entities header', () => {
    expect(() => {
      component.clickable?.forEach(_ => _.nativeElement.dispatchEvent( new KeyboardEvent('keypress', { key: 'Enter' })));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the expand decorated button', () => {
    expect(() => {
      component.clickableExpandDecorated?.forEach(_ => _.nativeElement.dispatchEvent( new KeyboardEvent('keypress', { key: 'Enter' })));
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard at the expand button', () => {
    expect(() => {
      component.clickableExpand?.forEach(_ => _.nativeElement.dispatchEvent( new KeyboardEvent('keypress', { key: 'Enter' })));
    }).not.toThrowError();
  });
});
