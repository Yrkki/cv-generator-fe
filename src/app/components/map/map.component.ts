import { Component, Input, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { take } from 'rxjs/operators';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import * as Plotly from 'plotly.js';

/**
 * Map component
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  /** Entity key. */
  @Input() key: any;

  /** The map element. */
  @ViewChild('map') map: ElementRef;

  /** The map html element. */
  mapHTMLElement: HTMLDivElement;

  /** CV delegate. */
  public get cv() { return this.portfolioComponent.cv; }
  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(event) { this.beforeprint(); }

  /**
   * Constructs the Map component.
   * @param portfolioComponent The common portfolio component injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent) {
    portfolioComponent.searchTokenChanged$.pipe(take(1)).subscribe(_ => this.onSearchTokenChanged(_));
  }

  /** Initialization */
  ngAfterViewInit() {
    this.drawMap('After view init');
  }

  /** Search token changed event handler. */
  private onSearchTokenChanged(value: string) {
    this.drawMap('Search token changed');
  }

  /** The resize event handler */
  private resize() {
    if (this.mapHTMLElement) {
      Plotly.Plots.resize(this.mapHTMLElement);
    }
  }

  /** The beforeprint event handler */
  private beforeprint() {
    this.resize();
  }

  /**
   * Draws a map.
   * @param caller The caller function identification.
   * @param mapContainer The map container. Optional.
   * @param entity The entity. Optional.
   * @param frequencies The frequencies. Optional.
   * @param countriesVisited The countries visited. Optional.
   */
  public async drawMap(caller, entity?, frequencies?: {}[], countriesVisited?: string[]) {
    // console.log('In drawMap:', caller);

    // get map container
    const mapContainer = this.map.nativeElement;
    if (!mapContainer) { return; }

    // ensure entity
    if (!entity) { entity = this.entities['Country']; }
    if (!entity) { return; }

    // ensure frequencies
    if (!frequencies) { frequencies = this.getFrequenciesCache(entity.key); }
    if (!frequencies) { return; }
    const frequenciesClone = frequencies.slice(0);

    // ensure countriesVisited
    if (!countriesVisited) { countriesVisited = this.countriesVisited; }
    if (!countriesVisited) { return; }

    // prepend other visited countries as map background
    countriesVisited.reverse().forEach(country => {
      if (!frequenciesClone.map(_ => _[0]).includes(country)) {
        frequenciesClone.unshift([country, { 'Count': 0 }]);
      }
    });

    // prepare data settings
    const locations = frequenciesClone.map(_ => _[0]);
    const z = frequenciesClone.map(_ => Number(_[1].Count));

    // calc color scale min value
    let maxCount = Math.max(...z);
    if (maxCount === 0) { maxCount = 1; }
    const colorScaleMinValue = 1 / maxCount;

    const data = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: locations,
      z: z,
      // text: locations,
      autocolorscale: false,
      colorscale: [
        [0, '#00000020'],  // countries visited background color
        [colorScaleMinValue, 'rgb(65,105,225)'],
        [1, 'rgb(220,166,224)']
        // [0, 'rgba(0, 0, 255, 1)'],
        // [1, 'rgba(255, 0, 0, 1)']
      ],
      colorbar: {
        // title: 'Markets count',
        thickness: 20,
        tick0: 0,
        dtick: 1,
        autotick: false
      },
      marker: {
        line: {
          color: 'rgba(0,0,0,0.5)',
          width: 1
        },
        opacity: 1
      }
    }];

    const layout = {
      title: 'Markets',
      geo: {
        scope: 'world',
        resolution: 50,

        projection: {
          type: 'robinson',
          scale: 4.5
        },
        center: {
          lon: 35,
          lat: 52
        },

        bgcolor: 'rgba(0,0,0,0)',

        showocean: true,
        oceancolor: 'rgba(0,255,255,0.2)',
        showland: false,
        landcolor: 'rgba(0,0,0,0.2)',
        showlakes: true,
        lakecolor: 'rgba(0,128,255,0.2)',
        showrivers: true,
        rivercolor: 'rgba(0,0,255,0.2)',
        showcountries: true,
        countrycolor: 'rgba(128,128,128,0.2)',
        showcoastlines: true,
        coastlinecolor: 'rgba(0,0,0,0.2)',
        showframe: true,
        framecolor: 'rgba(0,0,0,0.2)',
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: {
        t: 0,
        l: 0,
        r: 0,
        b: 0
      }
    };

    // purge old map
    mapContainer.innerHTML = '';

    // crate new map dom node
    const map = document.createElement('div');
    map.style.cssText = 'width: 100%; height: 250px';
    this.mapHTMLElement = mapContainer.appendChild(map);
    // console.log('Map width: ', this.mapHTMLElement.clientWidth);

    // plot map
    Plotly.plot(this.mapHTMLElement, data, layout, { showLink: false });
  }

  /** Get countries visited. */
  private get countriesVisited(): string[] {
    return this.cv['Countries visited'];
  }

  /** Get frequencies cache delegate. */
  getFrequenciesCache(propertyName: string): any[] {
    return this.portfolioComponent.getFrequenciesCache(propertyName);
  }
}
