import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocBarComponent } from './soc-bar.component';

describe('SocBarComponent', () => {
  let component: SocBarComponent;
  let fixture: ComponentFixture<SocBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocBarComponent]
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

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.linkLabel('');
    }).not.toThrowError();
  });

  it('should simulate mouse click using keyboard', () => {
    expect(() => {
      component.clickable.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });
});
