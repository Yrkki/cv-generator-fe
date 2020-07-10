import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationListComponent } from './publication-list.component';

import { AppModule } from 'src/app/app.module';

describe('PublicationListComponent', () => {
  let component: PublicationListComponent;
  let fixture: ComponentFixture<PublicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicationListComponent],
      imports: [
        AppModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.dateFormat;
      readAll = component.punctuation;
      readAll = component.getAccomplishmentPublicationLogoImageUri('');
      readAll = component.getAccomplishmentPublicationLogoImageUri('', true);
    }).not.toThrowError();
  });
});
