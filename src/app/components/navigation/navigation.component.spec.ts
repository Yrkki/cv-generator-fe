import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
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

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = {
        'componentName': component.componentName,
        'linkToThisSymbol': component.linkToThisSymbol,
        'linkToThisText': component.linkToThisText
      };
      readAll = component.tabName('tabName');

      component.portfolioComponent.entities = {
        ...(Object(component.portfolioComponent.entities)),
        ...{
          'Badges': {
            'node': 'Badges',
            'section': 'Badges',
            'parent': '',
            'class': 'hsl9b',
            'main': 'true'
          }
        }
      };
      const key = 'Badges';
      readAll = component.decorateMain(key);
      component.portfolioComponent.entities[key].section = component.portfolioComponent.entities[key].node;
      readAll = component.decorateMain(key);
      component.portfolioComponent.entities[key].section = '';
      readAll = component.decorateMain(key);
      component.portfolioComponent.entities[key].main = 'false';
      readAll = component.decorateMain(key);
      component.portfolioComponent.entities[key].section = component.portfolioComponent.entities[key].node;
      readAll = component.decorateMain(key);

      readAll = component.nonBreaking('nonBreaking');
      readAll = component.nonBreaking('');
      readAll = component.trackByFn(0, 0);
    }).not.toThrowError();
  });
});
