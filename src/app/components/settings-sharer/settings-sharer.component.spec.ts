import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSharerComponent } from './settings-sharer.component';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

// eslint-disable-next-line max-lines-per-function
describe('SettingsSharerComponent', () => {
  let component: SettingsSharerComponent;
  let fixture: ComponentFixture<SettingsSharerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsSharerComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSharerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check upload mouse click event handlers', () => {
    expect(() => {
      const settings = component.inputGroupUploadSettings;
      if (settings) { settings.nativeElement.innerText = component.defaultSettingsFileName; }
      component.uploadClicked(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check file input change event handler', () => {
    expect(() => {
      const settings = component.inputGroupUploadSettings;
      if (settings) { settings.nativeElement.innerText = component.defaultSettingsFileName; }
      component.uploadSettingsChanged(new Event('change', {}));
    }).not.toThrowError();
  });

  it('should check file input uploadSettingsLabel mouse click event handler', () => {
    expect(() => {
      const settings = component.inputGroupUploadSettings;
      if (settings) { settings.nativeElement.innerText = component.defaultSettingsFileName; }
      component.uploadSettingsLabel?.nativeElement.dispatchEvent(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      readAll = component.uploadSettingsLabel;
      readAll = component.inputGroupUploadSettings;
      readAll = component.defaultSettingsFileName;
      readAll = component.defaultSettingsFileExtension;
    }).not.toThrowError();
  });
});
