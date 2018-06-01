import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocBarComponent } from './soc-bar.component';

describe('SocBarComponent', () => {
  let component: SocBarComponent;
  let fixture: ComponentFixture<SocBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
