import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * Personal webpage component
 */
@Component({
  selector: 'app-webpage',
  templateUrl: './webpage.component.html',
  styleUrls: ['./webpage.component.scss']
})
export class WebpageComponent implements OnInit {
  public readonly name = 'Georgi Marinov';

  /**
   * Constructs the personal webpage component.
   * @param titleService The title service injected dependency.
   */
  constructor(private titleService: Title) {
    this.setTitle(this.name);
  }

  /** Initialization */
  ngOnInit() {
  }

  /**
   * Sets a new page title.
   * @param newTitle The new page title to set.
   */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
