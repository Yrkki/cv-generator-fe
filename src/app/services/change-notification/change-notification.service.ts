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
import { merge, Subject, Subscription } from 'rxjs';

/**
 * A change notification service.
 * Publishes loaded data changes and persisted settings changes,
 * and schedules the targeted change detection that zoneless OnPush components need.
 * A single subscription per component covers both kinds of change.
 */
@Injectable({
  providedIn: 'root'
})
export class ChangeNotificationService {
  /** Emits after data loaded from the backend, or filtered from it, has been written to the model. */
  public readonly dataChanged$ = new Subject<void>();
  /** Emits after a UI setting persisted in the local storage has changed. */
  public readonly settingsChanged$ = new Subject<void>();

  /**
   * Marks the calling component and its ancestors for check whenever loaded data or a persisted setting changes.
   * Under zoneless OnPush, components would otherwise stay stale.
   *
   * @param changeDetectorRef The change detector of the calling component.
   * @param destroyRef The destroy reference of the calling component, which ends the subscription.
   *
   * @returns The subscription, which ends when the calling component is destroyed.
   */
  public markForCheckOnChanged(changeDetectorRef: ChangeDetectorRef, destroyRef: DestroyRef): Subscription {
    return merge(this.dataChanged$, this.settingsChanged$)
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(() => changeDetectorRef.markForCheck());
  }
}
