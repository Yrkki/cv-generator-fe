import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingCommon } from '../../classes/testing-common/testing-common';

import { NavigationComponent } from './navigation.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        NavigationComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
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

  it('should check count values', () => {
    expect(() => {
      let readAll;
      for (const key in component.entities) {
        if (Object.prototype.hasOwnProperty.call(component.entities, key)) {
          const element = component.entities[key];
          readAll = component.getCountValue(element.node);
        }
      }
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.componentName;
      readAll = component.linkToThisSymbol;
      readAll = component.linkToThisText;

      readAll = component.tabName('tabName');

      const key = 'Badges';
      if (!component.portfolioService.entities.Badges) {
        component.portfolioService.entities = {
          ...(Object(component.portfolioService.entities)),
          ...{
            'Badges': {
              'node': key,
              'section': key,
              'parent': '',
              'class': 'hsl10b',
              'main': 'true'
            }
          }
        };
      }
      readAll = component.decorateMain(key);
      component.portfolioService.entities.Badges.section = component.portfolioService.entities?.Badges?.node;
      readAll = component.decorateMain(key);
      component.portfolioService.entities.Badges.section = '';
      readAll = component.decorateMain(key);
      component.portfolioService.entities.Badges.main = 'false';
      readAll = component.decorateMain(key);
      component.portfolioService.entities.Badges.section = component.portfolioService.entities?.Badges?.node;
      readAll = component.decorateMain(key);

      readAll = component.nonBreaking('nonBreaking');
      readAll = component.nonBreaking('');
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });
});
