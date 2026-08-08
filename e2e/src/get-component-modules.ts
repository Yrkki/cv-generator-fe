// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Georgi Marinov
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
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export const getComponentModules = (): { moduleName: string; fileName: string }[] => {
  const componentsDir = join(__dirname, '../../src/app/components');
  return readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const folderPath = join(componentsDir, entry.name);
      return readdirSync(folderPath)
        .filter((fileName) => fileName.endsWith('.component.ts'))
        .map((fileName) => {
          const filePath = join(folderPath, fileName);
          const contents = readFileSync(filePath, 'utf8');
          const match = contents.match(/export\s+class\s+([A-Za-z0-9_]+?)Component\b/);
          if (!match) {
            throw new Error(`Cannot parse component class name from ${filePath}`);
          }

          return {
            moduleName: match[1],
            fileName: fileName.replace('.component.ts', ''),
          };
        });
    })
    .sort((a, b) => a.fileName.localeCompare(b.fileName));
};
