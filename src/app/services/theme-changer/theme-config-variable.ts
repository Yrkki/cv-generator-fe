/** Theme config variable interface. */
export interface ThemeConfigVariable {
  /** Variable name. */
  name: string;
  /** Variable domponents. */
  components:
  {
    name: string,
    base: string,
    offset: string
  }[];
}
