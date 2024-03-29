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
import { Ui as IUi } from './../../interfaces/ui/ui';
import { UiEntry } from './../../interfaces/ui/ui-entry';
import { Indexable } from '../indexable';

/**
 * Ui class.
 * ~extends {@link Indexable<UiEntry>}
 * ~implements {@link IUi}
 */
export class Ui extends Indexable<UiEntry> implements IUi {
  /** The Search UI entry */
  'Search': UiEntry;
  /** The Delete UI entry */
  'Delete': UiEntry;
  /** The Clear Search UI entry */
  'Clear Search': UiEntry;
  /** The Start All Over UI entry */
  'Start All Over': UiEntry;
  /** The Instant Search UI entry */
  'Instant Search': UiEntry;
  /** The tag cloud UI entry */
  'tag cloud': UiEntry;
  /** The chart UI entry */
  'chart': UiEntry;
  /** The both UI entry */
  'both': UiEntry;
  /** The team members UI entry */
  'team members': UiEntry;
  /** The Disclaimer UI entry */
  'Disclaimer': UiEntry;
  /** The Copyright UI entry */
  'Copyright': UiEntry;
  /** The Name UI entry */
  'Name': UiEntry;
  /** The All rights reserved UI entry */
  'All rights reserved': UiEntry;
  /** The By UI entry */
  'By': UiEntry;
  /** The Trans UI entry */
  'Trans': UiEntry;
  /** The Ed UI entry */
  'Ed': UiEntry;
  /** The Decorations UI entry */
  'Decorations': UiEntry;
  /** The Pagination UI entry */
  'Pagination': UiEntry;
  /** The Mode UI entry */
  'Mode': UiEntry;
  /** The Expires UI entry */
  'Expires': UiEntry;
  /** The Link to this heading UI entry */
  'Link to this heading': UiEntry;
  /** The Collapse this heading UI entry */
  'Collapse this heading': UiEntry;
  /** The Expand this heading UI entry */
  'Expand this heading': UiEntry;
  /** The Search for this UI entry */
  'Search for this': UiEntry;
  /** The Go to this project UI entry */
  'Go to this project': UiEntry;
  /** The Go to top UI entry */
  'Go to top': UiEntry;
  /** The Up UI entry */
  'Up': UiEntry;
  /** The GitHub version UI entry */
  'GitHub version': UiEntry;
  /** The Package version UI entry */
  'Package version': UiEntry;
  /** The Build version UI entry */
  'Build version': UiEntry;
  /** The Number of languages UI entry */
  'Number of languages': UiEntry;
  /** The Top language UI entry */
  'Top language': UiEntry;
  /** The Tech stack on StackShare UI entry */
  'Tech stack on StackShare': UiEntry;
  /** The Angular package version UI entry */
  'Angular package version': UiEntry;
  /** The Angular version UI entry */
  'Angular version': UiEntry;
  /** The Angular next version UI entry */
  'Angular next version': UiEntry;
  /** The Angular node version required UI entry */
  'Angular node version required': UiEntry;
  /** The Angular CLI package version UI entry */
  'Angular CLI package version': UiEntry;
  /** The Angular CLI version UI entry */
  'Angular CLI version': UiEntry;
  /** The Angular CLI next version UI entry */
  'Angular CLI next version': UiEntry;
  /** The Angular CLI node version required UI entry */
  'Angular CLI node version required': UiEntry;
  /** The Node.js LTS version UI entry */
  'Node.js LTS version': UiEntry;
  /** The Node.js version UI entry */
  'Node.js version': UiEntry;
  /** The NPM LTS version UI entry */
  'NPM LTS version': UiEntry;
  /** The NPM version UI entry */
  'NPM version': UiEntry;
  /** The NPM next version UI entry */
  'NPM next version': UiEntry;
  /** The Travis build status UI entry */
  'Travis build status': UiEntry;
  /** The AppVeyor build status UI entry */
  'AppVeyor build status': UiEntry;
  /** The Test status UI entry */
  'Test status': UiEntry;
  /** The Codecov code coverage status UI entry */
  'Codecov code coverage status': UiEntry;
  /** The Coveralls code coverage status UI entry */
  'Coveralls code coverage status': UiEntry;
  /** The Code coverage list UI entry */
  'Code coverage list': UiEntry;
  /** The Snyk vulnerabilities UI entry */
  'Snyk vulnerabilities': UiEntry;
  /** The Codacy code analytics UI entry */
  'Codacy code analytics': UiEntry;
  /** The npm dependencies UI entry */
  'npm dependencies': UiEntry;
  /** The npm devDependencies UI entry */
  'npm devDependencies': UiEntry;
  /** The Documentation status UI entry */
  'Documentation status': UiEntry;
  /** The Heroku UI entry */
  'Heroku': UiEntry;
  /** The Lighthouse report entry */
  'Lighthouse report': UiEntry;
  /** The CD pipeline logs entry */
  'CD pipeline logs': UiEntry;
  /** The Changelog entry */
  'Changelog': UiEntry;
  /** The Last GitHub commit UI entry */
  'Last GitHub commit': UiEntry;
  /** The Progressive Web App UI entry */
  'Progressive Web App': UiEntry;
  /** The Sitemap UI entry */
  'Sitemap': UiEntry;
  /** The Third-party licenses UI entry */
  'Third-party licenses': UiEntry;
  /** The Code UI entry */
  'Code': UiEntry;
  /** The Documentation UI entry */
  'Documentation': UiEntry;
  /** The licensed under UI entry */
  'licensed under': UiEntry;
  /** The Apache-2.0 license UI entry */
  'Apache-2.0 license': UiEntry;
  /** The CC BY 4.0 UI entry */
  'CC BY 4.0': UiEntry;
  /** The Made in Bulgaria UI entry */
  'Made in Bulgaria': UiEntry;
  /** The Bulgaria UI entry */
  'Bulgaria': UiEntry;
  /** The Rose Valley UI entry */
  'Rose Valley': UiEntry;
}
