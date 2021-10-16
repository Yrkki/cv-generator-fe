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
import { Injectable } from '@angular/core';

/**
 * Document service.
 */
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  /** Show scroll to top button when told so. */
  public scrollFunction() {
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
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
