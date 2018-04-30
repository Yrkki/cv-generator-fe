import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() key: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.main();
  }

  main() {
    Plotly.d3.csv('../../assets/countries.csv',
      function (err, rows) {
        // tslint:disable-next-line:no-shadowed-variable
        function unpack(rows, key) {
          return rows.map(function (row) { return row[key]; });
        }

        const data = [{
          type: 'choropleth',
          locationmode: 'country names',
          locations: unpack(rows, 'Country'),
          z: unpack(rows, 'Weight'),
          // text: unpack(rows, 'Country'),
          autocolorscale: false,
          colorscale: [
            [0, 'rgb(65,105,225)'],
            [1, 'rgb(220,166,224)']
          ],
          colorbar: {
            // title: 'Projects',
            thickness: 20
          },
          marker: {
            line: {
              color: 'rgb(220,220,220)',
              width: 1
            }
          }
        }];

        const layout = {
          // title: 'Countries',
          geo: {
            projection: {
              type: 'robinson'
            },
            scope: 'europe',
            showlakes: true,
            lakecolor: 'rgb(209,247,255)'
          }
        };

        const map = document.getElementById('map');
        Plotly.plot(map, data, layout, { showLink: false });
      });
  }
}
