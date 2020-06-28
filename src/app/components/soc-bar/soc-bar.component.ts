import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

/**
 * Socilal networks bar component
 */
@Component({
  selector: 'app-soc-bar',
  templateUrl: './soc-bar.component.html',
  styleUrls: ['./soc-bar.component.scss']
})
export class SocBarComponent implements OnInit {
  /** A clickable element. */
  @ViewChild('clickable') clickable: ElementRef;

  /** Formatted phone */
  private readonly phone = '+359\u202F89\u202F347\u202F6810';
  private readonly email = 'yrkki\u0040yahoo.com';

  /** Socilal networks bar data */
  public socBar = {
    address: { name: 'Address', title: 'Nadezhda 421 A 5 14, 1231 Sofia, Bulgaria', link: '' },
    phone: { name: 'Phone', title: this.phone, link: 'tel:' + this.phone },
    email: { name: 'E-mail', title: this.email, link: 'mailto:' + this.email },
    linkedin: { name: 'LinkedIn', title: 'georgimarinov', link: 'https://www.linkedin.com/in/georgimarinov' },
    twitter: { name: 'Twitter', title: 'yrkki', link: 'https://twitter.com/yrkki' },
    facebook: { name: 'Facebook', title: 'jorich', link: 'https://www.facebook.com/jorich' },
    instagram: { name: 'Instagram', title: 'jorich1', link: 'https://www.instagram.com/jorich1' },
    web: { name: 'Web', title: 'marinov.ml', link: 'marinov.ml' }
  };

  /**
   * Constructs the Socilal networks bar component.
   */
  constructor() { }

  /** Initialization */
  ngOnInit() {
  }

  /**
   * Names an aria-label link.
   * @param key The type of link.
   *
   * @returns The aria-label link name.
   */
  public linkLabel(key: string): string {
    return key + '_link';
  }
}
