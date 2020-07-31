import { Injectable } from '@angular/core';

/**
 * Document service.
 */
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { }

  /** Show scroll to top button when told so. */
  public scrollFunction() {
    if (!document) { return; }

    const scrollTopThreshold = 20;
    const button = document.getElementById('goToTopBtn');
    if (button) {
      button.style.display =
        (document.body.scrollTop > scrollTopThreshold
          || document.documentElement.scrollTop > scrollTopThreshold)
          ? 'block' : 'none';
    }
  }

  /** Scroll to top. */
  public goToTop() {
    if (!document) { return; }

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
