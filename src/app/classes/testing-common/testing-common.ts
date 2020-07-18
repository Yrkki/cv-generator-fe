/**
 * Common testing static class.
 * Used at test time only.
 */
export class TestingCommon {
  /**
   * Check the common lifecycle hooks.
   * @param calee The object whose hooks are to be tested.
   */
  public static checkLifecycleHooks(calee: any) {
    const lifecycleHoooks = ['ngOnInit', 'ngAfterViewInit'] as const;
    lifecycleHoooks.forEach(hook => {
      if (calee[hook]) { calee[hook](); }
    });
  }
}
