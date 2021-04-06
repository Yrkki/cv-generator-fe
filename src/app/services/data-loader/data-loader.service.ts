import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';

import { Entities } from '../../classes/entities/entities';

import { DataService } from '../../services/data/data.service';
import { ChartService } from '../../services/chart/chart.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { CountCacheService } from '../count-cache/count-cache.service';

/**
 * A data-loader service.
 */
@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  /**
   * Constructs the DataLoader service.
   * ~constructor
   *
   * @param dataService The data service injected dependency.
   * @param chartService The chart service injected dependency.
   * @param countCacheService The count cache service injected dependency.
   * @param portfolioModel The portfolio model injected dependency.
   */
  constructor(
    private readonly dataService: DataService,
    private readonly chartService: ChartService,
    private readonly countCacheService: CountCacheService,
    private readonly portfolioModel: PortfolioModel) {
  }

  /**
   * Load data
   */
  public LoadData() {
    setTimeout(() => {
      this.getUi();
      this.getEntities();

      this.getCv();
      this.getProfessionalExperience();
      this.getEducation();
      this.getAccomplishments();
      this.getPublications();

      this.getProjects();

      this.chartService.initColors();
    });
  }

  /** Loads the CV. */
  private getCv(): void {
    this.dataService.getCv().pipe(take(1)).subscribe((cv) => {
      if (this.isEmpty(cv)) { return; }
      this.portfolioModel.cv = cv;
      this.portfolioModel.filtered.Languages = cv.Languages;

      // prefilter accessible personal data
      this.portfolioModel.cv['Personal data'] =
        this.portfolioModel.cv['Personal data'].filter((_) => _['Personal data'] && !['true', 'TRUE'].includes(_.Hidden));

      this.calcCountCache(['Language', 'Accomplishment']);
    });
  }

  /** Loads the professional experience. */
  private getProfessionalExperience(): void {
    this.dataService.getProfessionalExperience().pipe(take(1)).subscribe((experience) => {
      if (this.isEmpty(experience)) { return; }
      // this.experience = experience;
      this.portfolioModel.cv['Professional experience'] = experience;
      this.portfolioModel.filtered.ProfessionalExperience = experience;
    });
  }

  /** Loads the education. */
  private getEducation(): void {
    this.dataService.getEducation().pipe(take(1)).subscribe((education) => {
      if (this.isEmpty(education)) { return; }
      // this.education = education;
      this.portfolioModel.cv.Education = education;
      this.portfolioModel.filtered.Education = education;
    });
  }

  /** Loads the accomplishments. */
  private getAccomplishments(): void {
    this.dataService.getAccomplishments().pipe(take(1)).subscribe((accomplishments) => {
      if (this.isEmpty(accomplishments)) { return; }
      // this.accomplishments = accomplishments;
      this.portfolioModel.cv.Courses = accomplishments;
      this.portfolioModel.filtered.Accomplishments = accomplishments;
      this.calcCountCache(['Accomplishment']);
    });
  }

  /** Loads the publications. */
  private getPublications(): void {
    this.dataService.getPublications().pipe(take(1)).subscribe((publications) => {
      if (this.isEmpty(publications)) { return; }
      // this.publications = publications;
      this.portfolioModel.cv.Publications = publications;
      this.portfolioModel.filtered.Publications = publications;
      this.calcCountCache(['Publication']);
    });
  }

  /** Loads the projects. */
  private getProjects(): void {
    this.dataService.getProjects().pipe(take(1)).subscribe((projects) => {
      if (this.isEmpty(projects)) { return; }
      this.portfolioModel.projects = projects;
      this.portfolioModel.filtered.Projects = projects;
      this.calcCountCache(['Project', 'Accomplishment']);
    });
  }

  /** Loads the entities. */
  private getEntities(): void {
    this.dataService.getEntities().pipe(take(1)).subscribe((entities) => {
      if (this.isEmpty(entities)) { return; }
      this.adjustEntities(entities);
      this.portfolioModel.entities = entities;
    });
  }

  /** Loads the UI. */
  private getUi(): void {
    this.dataService.getUi().pipe(take(1)).subscribe((ui) => {
      if (this.isEmpty(ui)) { return; }
      this.portfolioModel.ui = ui;
    });
  }

  /**
   * Adjusts the entities.
   * @param entities The entities.
   */
  private adjustEntities(entities: Entities) {
    for (const key in entities) {
      if (entities.hasOwnProperty(key)) {
        const entity = entities[key];

        // calculate key
        entity.key = key;

        // start calculating section
        entity.section = entity.node;
        entity.section = StringExService.toTitleCase(entity.section);

        // adjust some words' case
        if (['IDEs and Tools'].includes(key)) {
          entity.section = entity.node;
        }

        // prefix some with 'By'
        // ...

        // pluralise others
        if (['Platform', 'Architecture', 'Languages and notations', 'IDEs and Tools',
          'Role', 'Responsibilities', 'Team size', 'Position', 'Reference'].includes(key)) {
          if (entity.section.substr(entity.section.length - 1) !== 's') {
            entity.section += 's';
          }
        }

        // specially pluralise others
        // ...

        // completely change others
        if (['General Timeline Map'].includes(key)) {
          entity.section = '';
        }

        // apply AI to some
        entity.AI = ['Responsibilities'].includes(key);

        // apply emSymbol to some
        entity.emSymbol = entity.key.includes('Map');

        // fix encrypted periods when needed
        if (['Contemporary Period', 'Modern Age', 'Renaissance', 'Dark Ages'].includes(key)) {
          this.countCacheService.decryptedPeriod[entity.node] = key;
          entity.node = key;
        }

        // calculate chart name
        entity.chart = this.chartService.chartName(key);

        // calculate variant names
        entity.content = StringExService.snakeCase(this.variantName(key, 'content'));
        entity.displayColumns = this.countCacheService.uiService.uiText('columns');
        entity.displayContentColumns = this.countCacheService.uiService.uiText('content columns');
        entity.displayLayoutColumns = this.countCacheService.uiService.uiText('layout columns');
        entity.columns = this.variantName(key, entity.displayColumns);
        entity.contentColumns = this.variantName(key, entity.displayContentColumns);
        entity.layoutColumns = this.variantName(key, entity.displayLayoutColumns);
      }
    }
  }

  /**
   * Names a variant element.
   * @param key The type of element.
   * @param variant The variant name.
   *
   * @returns The variant element name.
   */
  private variantName(key: string, variant: string): string {
    return key + ' ' + variant;
  }

  /**
   * Whether an object is empty.
   * @param obj The object to check.
   *
   * @returns Whether an object is empty.
   */
  public isEmpty(obj: Record<string, unknown>): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  /** Calculates the count cache for the property types registered and refreshes the clients. */
  private calcCountCache(propertyNames: string[]) {
    this.countCacheService.calcCountCache(propertyNames);
    if (propertyNames.length === 0 || propertyNames.includes('Project')) {
      this.chartService.refreshCharts();
    }
  }
}
