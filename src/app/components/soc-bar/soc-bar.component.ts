// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { Component, Input } from '@angular/core';
import { UiService } from '../../services/ui/ui.service';
import { StringExService } from '../../services/string-ex/string-ex.service';

/**
 * Socilal networks bar component
 */
@Component({
  standalone:false,
  selector: 'app-soc-bar',
  templateUrl: './soc-bar.component.html',
  styleUrls: ['./soc-bar.component.scss']
})
export class SocBarComponent {
  /** The bar type. */
  @Input() barTypeCorporate = false;

  /** Formatted address */
  private get address() { return this.uiService.uiText('Address'); }
  /** Formatted phone */
  private get phone() { return this.uiService.uiText('Phone'); }
  /** Formatted email */
  private get email() { return this.uiService.uiText('E-mail'); }
  /** Formatted web */
  private get web() { return this.uiService.uiText('Web'); }

  /** Formatted corporate address */
  private get corporateAddress() { return this.uiService.uiText('Corporate Address'); }
  /** Formatted corporate address link */
  private get corporateAddressLink() { return this.uiService.uiText('Corporate Address link'); }
  /** Formatted corporate phone */
  private get corporatePhone() { return this.uiService.uiText('Corporate Phone'); }
  /** Formatted corporate email */
  private get corporateEmail() { return this.uiService.uiText('Corporate E-mail'); }
  /** Formatted corporate web */
  private get corporateWeb() { return this.uiService.uiText('Corporate Web'); }

  /** Socilal networks bar data */
  public get socBar() {
    return {
      address: { name: 'Address', title: this.address, link: '' },
      phone: { name: 'Phone', title: this.phone, link: 'tel:' + this.phone },
      email: { name: 'E-mail', title: this.email, link: 'mailto:' + this.email },
      linkedin: { name: 'LinkedIn', title: 'georgimarinov', link: 'https://www.linkedin.com/in/georgimarinov' },
      twitter: { name: 'Twitter', title: 'yrkki', link: 'https://twitter.com/yrkki' },
      facebook: { name: 'Facebook', title: 'jorich', link: 'https://www.facebook.com/jorich' },
      instagram: { name: 'Instagram', title: 'jorich1', link: 'https://www.instagram.com/jorich1' },
      web: { name: 'Web', title: this.cleanProtocol(this.web), link: this.web }
    };
  }

  /** Corporate bar data */
  public get corporateBar() {
    return {
      address: { name: 'Address', title: this.corporateAddress, link: this.corporateAddressLink },
      phone: { name: 'Phone', title: this.corporatePhone, link: 'tel:' + this.corporatePhone },
      email: { name: 'E-mail', title: this.corporateEmail, link: 'mailto:' + this.corporateEmail },
      web: { name: 'Web', title: this.cleanProtocol(this.corporateWeb), link: this.corporateWeb }
    };
  }

  /**
   * Constructs the Socilal networks bar component.
   *
   * @param uiService The ui service injected dependency.
   */
  constructor(
    public readonly uiService: UiService,
  ) { }

  /**
   * Names an aria-label link.
   *
   * @param key The type of link.
   *
   * @returns The aria-label link name.
   */
  public linkLabel(key: string | undefined): string {
    return key + '_link';
  }

  /**
   * Simple url protocol cleaner.
   *
   * @param key The url string ingested.
   *
   * @returns The cleaned url.
   */
  public cleanProtocol(urlString: string): string {
    return StringExService.replaceAll(urlString, 'http://|https://', '');
  }
}
