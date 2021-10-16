// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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
import { Accomplishment } from './accomplishment';

describe('Accomplishment', () => {
  it('should create an instance', () => {
    expect(new Accomplishment()).toBeTruthy();
  });

  it('should check accomplishment types', () => {
    expect(() => {
      const accomplishment = new Accomplishment();

      let readAll;
      readAll = Accomplishment.isCertification(accomplishment);
      readAll = Accomplishment.isLanguage(accomplishment);
      readAll = Accomplishment.isCourse(accomplishment);
      readAll = Accomplishment.isOrganization(accomplishment);
      readAll = Accomplishment.isHonorAndAward(accomplishment);
      readAll = Accomplishment.isVolunteering(accomplishment);
      readAll = Accomplishment.isVacation(accomplishment);

      readAll = (Accomplishment as any).isArt(accomplishment);
      readAll = (Accomplishment as any).isLanguageCourse(accomplishment);
    }).not.toThrowError();
  });
});
