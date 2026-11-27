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
import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { Ui } from '../../classes/ui/ui';
import { UiAdjusterService } from './ui-adjuster.service';

describe('UiAdjusterService', () => {
  let service: UiAdjusterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiAdjusterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add the texts the backend does not provide yet', () => {
    const ui = new Ui();
    UiAdjusterService.adjustUi(ui);
    expect(ui['responsive'].text).toBe('responsive mode');
    expect(ui['spaced out'].text).toBe('spaced out');
    expect(ui['Mode'].text).toBe('display mode');
    expect(ui['classify'].text).toBe('classify');
    expect(ui['toolbar collapsed'].text).toBe('◁');
  });

  it('should replace an older backend text and keep the other entries', () => {
    const ui = new Ui();
    ui['Mode'] = { text: 'mode' };
    ui['chart'] = { text: 'chart' };
    UiAdjusterService.adjustUi(ui);
    expect(ui['Mode'].text).toBe('display mode');
    expect(ui['chart'].text).toBe('chart');
  });
});
