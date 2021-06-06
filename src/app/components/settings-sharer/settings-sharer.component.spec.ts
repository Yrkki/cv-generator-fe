import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSharerComponent } from './settings-sharer.component';

import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

// eslint-disable-next-line max-lines-per-function
describe('SettingsSharerComponent', () => {
  let component: SettingsSharerComponent;
  let fixture: ComponentFixture<SettingsSharerComponent>;
  let debugComponent: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsSharerComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSharerComponent);
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check upload mouse click event handlers', () => {
    expect(() => {
      const settings = component.inputGroupUploadSettings;
      if (settings) { settings.nativeElement.innerText = component.defaultSettingsFileName; }
      component.onUploadClicked(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check file input change event handler', () => {
    expect(() => {
      const settings = component.inputGroupUploadSettings;
      if (settings) { settings.nativeElement.innerText = component.defaultSettingsFileName; }
      component.onUploadSettingsChanged(new Event('change', {}));
    }).not.toThrowError();
  });

  it('should check file input uploadSettingsLabel mouse click event handler', () => {
    expect(() => {
      const settings = component.inputGroupUploadSettings;
      if (settings) { settings.nativeElement.innerText = component.defaultSettingsFileName; }
      component.uploadSettingsLabel?.nativeElement.dispatchEvent(new MouseEvent('click'));
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = component.uploadSettingsLabel;
      readAll = component.inputGroupUploadSettings;
      readAll = component.defaultSettingsFileName;
      readAll = component.defaultSettingsFileExtension;
    }).not.toThrowError();
  });

  it('should check the uploadSettingsChanged method and event', () => {
    expect(() => {
      let readAll;

      readAll = component.onUploadSettingsChanged(new Event('change', {}));

      readAll = debugComponent.uploadSettingsChanged();

      // tslint:disable-next-line: no-non-null-assertion
      const inputGroupUploadSettings = component.inputGroupUploadSettings?.nativeElement!;
      readAll = debugComponent.uploadSettingsChanged(inputGroupUploadSettings);

      inputGroupUploadSettings.files = ((files) => {
        const b = new ClipboardEvent('').clipboardData || new DataTransfer();
        for (let i = 0, len = files.length; i < len; i++) { b.items.add(files[i]); }
        return b.files;
      })([new File(['{ "test": true }'], 'test-settings-file.json', { type: 'application/json' })]);
      readAll = debugComponent.uploadSettingsChanged(inputGroupUploadSettings);

      component.uploadSettingsLabel = undefined;
      readAll = debugComponent.uploadSettingsChanged(inputGroupUploadSettings);
    }).not.toThrowError();
  });

  it('should check the uploadSettings method', () => {
    expect(() => {
      const readAll = component.uploadSettings(new File(['{ "test": true }'], 'test-settings-file.json', { type: 'application/json' }));
    }).not.toThrowError();
  });

  it('should check the updateStorage method', () => {
    expect(() => {
      const readAll = debugComponent.updateStorage({ test: true });
    }).not.toThrowError();
  });

  it('should check the onUploadClicked method', () => {
    expect(() => {
      let readAll;

      readAll = component.onUploadClicked(new MouseEvent('click'));

      component.uploadSettingsLabel = undefined;
      readAll = component.onUploadClicked(new MouseEvent('click'));
    }).not.toThrowError();
  });
});
