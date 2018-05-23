import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationIndexComponent } from './publication-index.component';

describe('PublicationIndexComponent', () => {
  let component: PublicationIndexComponent;
  let fixture: ComponentFixture<PublicationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
