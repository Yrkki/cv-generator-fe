export class UI implements UI {
}

export interface UiEntry {
  'text': string;
}

export interface UI {
  'Search': UiEntry;
  'Delete': UiEntry;
  'Clear Search': UiEntry;
  'Start All Over': UiEntry;
  'tag cloud': UiEntry;
  'chart': UiEntry;
  'both': UiEntry;
  'team members': UiEntry;
  'Disclaimer': UiEntry;
  'Copyright': UiEntry;
  'By': UiEntry;
  'Trans': UiEntry;
  'Ed': UiEntry;
  'Mode': UiEntry;
  'Expires': UiEntry;
  'Link to this heading': UiEntry;
  'Collapse this heading': UiEntry;
  'Expand this heading': UiEntry;
  'Search for this': UiEntry;
  'Go to this project': UiEntry;
  'Go to top': UiEntry;
}
