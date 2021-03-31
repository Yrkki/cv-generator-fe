import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { Indexable } from '../../interfaces/indexable';

/** The global this object */
const global = globalThis as Indexable;

/** The global Plotly object */
const plotly = global.Plotly;

/**
 * Map component
 * ~implements {@link OnInit}
 * ~implements {@link OnDestroy}
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  /** Entity key. */
  @Input() key: any;

  /** The map element. */
  @ViewChild('map') map?: ElementRef;

  /** The map html element. */
  mapHTMLElement?: HTMLDivElement;

  /** CV delegate. */
  public get cv() { return this.portfolioService.cv; }
  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }

  /** Search token subscription. */
  private searchTokenSubscription: Subscription | undefined;

  /** The resize host listener */
  @HostListener('window:resize') onResize() { this.resize(); }
  /** The beforeprint host listener */
  @HostListener('window:beforeprint', ['$event']) onBeforePrint(event: Event) { this.beforeprint(); }

  /**
   * Constructs the Map component.
   * @param portfolioService The portfolio service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService) {
  }

  /** Subscription */
  ngOnInit() {
    this.searchTokenSubscription = this.portfolioService.searchTokenChanged$.subscribe((_: string) => this.onSearchTokenChanged(_));
  }

  /** Cleanup */
  ngOnDestroy() {
    this.searchTokenSubscription?.unsubscribe();
  }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    this.drawMap('After view init');
  }

  /** Search token changed event handler. */
  private onSearchTokenChanged(value: string) {
    this.drawMap('Search token changed');
  }

  /** The resize event handler */
  private resize() {
    if (this.mapHTMLElement) {
      plotly.Plots.resize(this.mapHTMLElement);
    }
  }

  /** The beforeprint event handler */
  private beforeprint() {
    this.resize();
  }

  /**
   * Draws a map.
   * @param caller The caller function identification.
   * @param entity The entity. Optional.
   * @param frequencies The frequencies. Optional.
   * @param countriesVisited The countries visited. Optional.
   */
  public async drawMap(caller: any, entity?: Indexable, frequencies?: Indexable[], countriesVisited?: string[]) {
    // console.log('Debug: In drawMap:', caller);

    // get map container
    const mapContainer = this.map?.nativeElement;
    if (!mapContainer) { return; }

    // ensure entity
    const constCountry = 'Country';
    if (!entity) { entity = this.entities[constCountry]; }
    if (!entity) { return; }

    // ensure frequencies
    if (!frequencies) { frequencies = this.getFrequenciesCache(entity.key); }
    if (!frequencies) { return; }
    const frequenciesClone = frequencies.slice(0);

    // ensure countriesVisited
    if (!countriesVisited) { countriesVisited = this.countriesVisited; }
    if (!countriesVisited) { return; }

    // prepend other visited countries as map background
    [...countriesVisited].reverse().forEach((country) => {
      if (!frequenciesClone.map((value: Indexable, index: number, array: Indexable[]) => value[0]).includes(country)) {
        frequenciesClone.unshift([country, { 'Count': 0 }]);
      }
    });

    // prepare data settings
    const locations = frequenciesClone.map((value: Indexable, index: number, array: Indexable[]) => value[0]);
    const z = frequenciesClone.map((value: Indexable, index: number, array: Indexable[]) => Number(value[1].Count));

    // calc color scale min value
    let maxCount = Math.max(...z);
    if (maxCount === 0) { maxCount = 1; }
    const colorScaleMinValue = 1 / maxCount;

    const data = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations,
      z,
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
    // console.log('Debug: Map width: ', this.mapHTMLElement.clientWidth);

    // plot map
    plotly?.plot(this.mapHTMLElement, data, layout, { showLink: false });
  }

  /** Get countries visited. */
  private get countriesVisited(): string[] {
    return this.cv['Countries visited'];
  }

  /** Get frequencies cache delegate. */
  getFrequenciesCache(propertyName: string): any[] {
    return this.portfolioService.getFrequenciesCache(propertyName);
  }
}
