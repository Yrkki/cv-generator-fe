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
import { ChangeDetectorRef, DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, Subscription } from 'rxjs';
/**
 * A data change notification service.
 * Publishes data changes and schedules the targeted change detection that zoneless OnPush components need.
 */
@Injectable({
  providedIn: 'root'
})
export class DataChangeNotificationService {
  /** Emits after loaded data has been written to the model, so that zoneless change detection can be scheduled. */
  public readonly dataChanged$ = new Subject<void>();

  /**
   * Marks the calling component and its ancestors for check whenever loaded data changes.
   * Under zoneless OnPush, components created before their data arrives would otherwise stay stale.
   *
   * @param changeDetectorRef The change detector of the calling component.
   * @param destroyRef The destroy reference of the calling component, which ends the subscription.
   *
   * @returns The subscription, which ends when the calling component is destroyed.
   */
  public markForCheckOnDataChanged(changeDetectorRef: ChangeDetectorRef, destroyRef: DestroyRef): Subscription {
    return this.dataChanged$
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(() => changeDetectorRef.markForCheck());
  }
}
