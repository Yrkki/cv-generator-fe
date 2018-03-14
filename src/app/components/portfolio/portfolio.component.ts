import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  componentName = 'portfolio';

  constructor(@Inject('BASE_URL') baseUrl: string) { }

  ngOnInit() {
  }

}
