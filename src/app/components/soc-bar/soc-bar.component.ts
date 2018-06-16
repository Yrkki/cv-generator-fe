import { Component, OnInit } from '@angular/core';

/**
 * Socilal networks bar component
 */
@Component({
  selector: 'app-soc-bar',
  templateUrl: './soc-bar.component.html',
  styleUrls: ['./soc-bar.component.scss']
})
export class SocBarComponent implements OnInit {
  /** Socilal networks bar data */
  public socBar = {
    address: { title: 'Nadezhda 421 A 5 14, 1231 Sofia, Bulgaria', link: '' },
    phone: { title: '+359893476810', link: 'tel:+359893476810' },
    email: { title: 'yrkki@yahoo.com', link: 'mailto:yrkki@yahoo.com' },
    linkedin: { title: 'georgimarinov', link: 'https://www.linkedin.com/in/georgimarinov' },
    twitter: { title: 'yrkki', link: 'https://twitter.com/yrkki' },
    facebook: { title: 'jorich', link: 'https://www.facebook.com/jorich' },
    instagram: { title: 'jorich1', link: 'https://www.instagram.com/jorich1' }
  };

  /**
   * Constructs the Socilal networks bar component.
   */
  constructor() { }

  /** Initialization */
  ngOnInit() {
  }

}
