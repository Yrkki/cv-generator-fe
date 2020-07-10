/** Entity interface. */
export interface Entity {
  /** The node (name). */
  'node': string;
  /** The parent. */
  'parent': string;
  /** The element class. */
  'class': string;
  /** Whether the entityis a main one. */
  'main': string;

  /** The key calculated filed. */
  'key': string;
  /** The section name calculated filed. */
  'section': string;
  /** The chart element name calculated filed. */
  'chart': string;
  /** The content element name calculated filed. */
  'content': string;
  /** Whether to apply lexical analysis euristics when parsing each value encountered. */
  'AI': boolean;
}
