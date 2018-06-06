import { GeneralTimelineModule } from './general-timeline.module';

describe('GeneralTimelineModule', () => {
  let generalTimelineModule: GeneralTimelineModule;

  beforeEach(() => {
    generalTimelineModule = new GeneralTimelineModule();
  });

  it('should create an instance', () => {
    expect(generalTimelineModule).toBeTruthy();
  });
});
