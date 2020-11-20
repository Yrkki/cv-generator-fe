import { Accomplishment } from './accomplishment';

describe('Accomplishment', () => {
  it('should create an instance', () => {
    expect(new Accomplishment()).toBeTruthy();
  });

  it('should check accomplishment types', () => {
    expect(() => {
      const accomplishment = new Accomplishment();

      let readAll;
      readAll = Accomplishment.isCertification(accomplishment);
      readAll = Accomplishment.isLanguage(accomplishment);
      readAll = Accomplishment.isCourse(accomplishment);
      readAll = Accomplishment.isOrganization(accomplishment);
      readAll = Accomplishment.isVolunteering(accomplishment);
      readAll = Accomplishment.isVacation(accomplishment);
    }).not.toThrowError();
  });
});
