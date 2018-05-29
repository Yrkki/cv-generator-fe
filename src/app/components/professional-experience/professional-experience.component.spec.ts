import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalExperienceComponent } from './professional-experience.component';

import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('ProfessionalExperienceComponent', () => {
  let component: ProfessionalExperienceComponent;
  let fixture: ComponentFixture<ProfessionalExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule
      ],
      providers: [
        ProfessionalExperienceComponent,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
