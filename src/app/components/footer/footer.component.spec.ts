import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
    expect(() => { component.ngOnInit(); }).not.toThrowError();
  });

  it('should toggle ExpandBadges', () => {
    expect(() => {
      const value = component.ExpandBadges;
      component.ExpandBadgesElement?.nativeElement?.click();
      component.ExpandBadgesElement?.nativeElement?.click();
      component.ExpandBadges = value;
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
    }).not.toThrowError();
  });
});
