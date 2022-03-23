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
import { Ontology } from '../../classes/ontology/ontology';

// import { PortfolioModel } from '../../model/portfolio/portfolio.model';

// import { ImageService } from '../../services/image/image.service';
// import { LocalizationService } from '../../services/localization/localization.service';
import { OntologyAdjusterService } from '../ontology-adjuster/ontology-adjuster.service';

/**
 * A Ontology service.
 */
@Injectable({
  providedIn: 'root'
})
export class OntologyService {
  // /** Ontology data. */
  // public ontology = new Ontology();
  // /** Ontology data getter. */
  // public get ontology() { return this.portfolioModel.ontology; }
  // /** Ontology data setter. */
  // public set ontology(value: Ontology) { this.portfolioModel.ontology = value; }
  /** Ontology data getter. */
  public get ontology() { return this.ontologyAdjusterService.ontology; }
  /** Ontology data setter. */
  public set ontology(value: Ontology) { this.ontologyAdjusterService.ontology = value; }

  /**
   * Constructs the Ontology service.
   * ~constructor
   *
   * @param ontologyAdjusterService The ontology adjuster service injected dependency.
   */
  constructor(
    // private readonly portfolioModel: PortfolioModel,
    public readonly ontologyAdjusterService: OntologyAdjusterService,
  ) {
  }
}
