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
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ChangeDetectorRef, DestroyRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ChangeNotificationService } from './change-notification.service';
// eslint-disable-next-line max-lines-per-function
describe('ChangeNotificationService', () => {
  let service: ChangeNotificationService;
  let onDestroy: () => void;
  const destroyRef = { onDestroy: (callback: () => void) => { onDestroy = callback; return () => undefined; } } as unknown as DestroyRef;
  beforeEach(() => {
    onDestroy = () => undefined;
    service = TestBed.inject(ChangeNotificationService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should mark for check after a data or a settings change and stop after destroy', () => {
    const markForCheck = vi.fn();
    const subscription = service.markForCheckOnChanged({ markForCheck } as unknown as ChangeDetectorRef, destroyRef);
    service.dataChanged$.next();
    expect(markForCheck).toHaveBeenCalledTimes(1);
    service.settingsChanged$.next();
    expect(markForCheck).toHaveBeenCalledTimes(2);
    onDestroy();
    service.dataChanged$.next();
    service.settingsChanged$.next();
    expect(markForCheck).toHaveBeenCalledTimes(2);
    expect(subscription.closed).toBe(true);
  });
  it('should keep the data and the settings subjects separate', () => {
    const dataChanged = vi.fn();
    const settingsChanged = vi.fn();
    const dataSubscription = service.dataChanged$.subscribe(dataChanged);
    const settingsSubscription = service.settingsChanged$.subscribe(settingsChanged);
    service.settingsChanged$.next();
    expect(settingsChanged).toHaveBeenCalledTimes(1);
    expect(dataChanged).not.toHaveBeenCalled();
    service.dataChanged$.next();
    expect(dataChanged).toHaveBeenCalledTimes(1);
    expect(settingsChanged).toHaveBeenCalledTimes(1);
    dataSubscription.unsubscribe();
    settingsSubscription.unsubscribe();
  });
});
