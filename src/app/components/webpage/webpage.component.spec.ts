import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageComponent } from './webpage.component';
import { SocBarComponent } from '../soc-bar/soc-bar.component';

import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('WebpageComponent', () => {
  let component: WebpageComponent;
  let fixture: ComponentFixture<WebpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        SocBarComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
