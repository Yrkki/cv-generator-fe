import { Injectable } from '@angular/core';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';
import { EntitiesModel } from '../../model/entities/entities.model';

/**
 * The main model.
 */
@Injectable({
  providedIn: 'root'
})
export class ModelModel {
  /** CV getter. */
  public get cv() { return this.portfolioModel.cv; }

  /** Entities getter. */
  public get entities() { return this.portfolioModel.entities; }

  /** Projects getter. */
  public get projects() { return this.portfolioModel.projects; }

  /** UI data getter. */
  public get ui() { return this.portfolioModel.ui; }

  /** Aggregation count cache getter. */
  public get countCache() { return this.entitiesModel.countCache; }
  /** Aggregation count cache setter. */
  public set countCache(value) { this.entitiesModel.countCache = value; }

  /** Filtered getter. */
  public get filtered() { return this.portfolioModel.filtered; }

  /**
   * Constructs the model.
   * ~constructor
   *
   * @param portfolioModel The portfolio model injected dependency.
   * @param entitiesModel The entities model injected dependency.
   */
  constructor(
    public readonly portfolioModel: PortfolioModel,
    public readonly entitiesModel: EntitiesModel
  ) {
  }
}
