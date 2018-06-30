/** CV */
export class CV implements CV {
  /** The Personal data */
  'Personal data': PersonalData[];
  /** The Professional experience */
  'Professional experience': ProfessionalExperience[];
  /** The Education */
  'Education': Education[];
  /** The Certifications */
  'Certifications': Certification[];
  /** The Languages */
  'Languages': Language[];
  /** The Courses */
  'Courses': Course[];
  /** The Publications */
  'Publications': Publication[];
}

/** Parsonal data */
export interface PersonalData {
  /** The Caption */
  'Caption': string;
  /** The Personal data */
  'Personal data': string;
  /** Visual highlight class */
  'Highlight': string;
}

/** Professional experience */
export interface ProfessionalExperience {
  /** The Id */
  'Id': number;
  /** The From */
  'From': number;
  /** The To */
  'To': number;
  /** The Experience */
  'Experience': string;
  /** The Position */
  'Position': string;
  /** The Description */
  'Description': string[];
  /** The Link */
  'Link': string;
  /** The Image */
  'Image': string;
  /** The Color */
  'Color': string;
  /** Visual highlight class */
  'Highlight': string;
}

/** Education */
export interface Education {
  /** The Id */
  'Id': number;
  /** The From */
  'From': number;
  /** The To */
  'To': number;
  /** The School */
  'School': string;
  /** The Degree */
  'Degree': string;
  /** The Field */
  'Field': string;
  /** The Grade */
  'Grade': string;
  /** The Description */
  'Description': string;
  /** The Link */
  'Link': string;
  /** The Image */
  'Image': string;
  /** The Color */
  'Color': string;
  /** Visual highlight class */
  'Highlight': string;
}

/** Certification */
export interface Certification {
  /** The Id */
  'Id': number;
  /** The Name */
  'Name': string;
  /** The URL */
  'URL': string;
  /** The Authority name */
  'Authority name': string;
  /** The Authority URL */
  'Authority URL': string;
  /** The Authority image */
  'Authority image': string;
  /** The Type */
  'Type': string;
  /** The Level */
  'Level': string;
  /** The Location */
  'Location': string;
  /** The Started */
  'Started': number;
  /** The Completed */
  'Completed': number;
  /** The Expiration? */
  'Expiration?': number;
  /** The Certificate number */
  'Certificate number': string;
  /** The Certificate URL */
  'Certificate URL': string;
  /** The Certificate image */
  'Certificate image': string;
  /** The Certificate image URL */
  'Certificate image URL': string;
  /** The Certificate logo */
  'Certificate logo': string;
  /** The Certificate tag */
  'Certificate tag': string;
  /** The Color */
  'Color': string;
}

/** Language */
export interface Language {
  /** The Language */
  'Language': string;
  /** The Level */
  'Level': string;
  /** The Score */
  'Score': number;
  /** The Share */
  'Share': number;
}

/** Course */
export interface Course {
  /** The Id */
  'Id': number;
  /** The Name */
  'Name': string;
  /** The URL */
  'URL': string;
  /** The Authority name */
  'Authority name': string;
  /** The Authority URL */
  'Authority URL': string;
  /** The Authority image */
  'Authority image': string;
  /** The Type */
  'Type': string;
  /** The Level */
  'Level': string;
  /** The Location */
  'Location': string;
  /** The Started */
  'Started': number;
  /** The Completed */
  'Completed': number;
  /** The Expiration? */
  'Expiration?': any;
  /** The Certificate number */
  'Certificate number': string;
  /** The Certificate URL */
  'Certificate URL': string;
  /** The Certificate image */
  'Certificate image': string;
  /** The Certificate image URL */
  'Certificate image URL': string;
  /** The Certificate logo */
  'Certificate logo': string;
  /** The Certificate tag */
  'Certificate tag': string;
  /** The Color */
  'Color': string;
}

/** Publication */
export interface Publication {
  /** The Id */
  'Id': number;
  /** The Article */
  'Article': string;
  /** The Article author */
  'Article author': string;
  /** The Article date */
  'Article date': string;
  /** The Title */
  'Title': string;
  /** The Subtitle */
  'Subtitle': string;
  /** The Translation Article */
  'Translation Article': string;
  /** The Translation Title */
  'Translation Title': string;
  /** The Translation Subtitle */
  'Translation Subtitle': string;
  /** The Translator */
  'Translator': string;
  /** The Editor */
  'Editor': string;
  /** The Publisher */
  'Publisher': string;
  /** The Publication date */
  'Publication date': string;
  /** The Type */
  'Type': string;
  /** The Author */
  'Author': string;
  /** The City */
  'City': string;
  /** The Page count */
  'Page count': string;
  /** The Pages */
  'Pages': string;
  /** The Size */
  'Size': string;
  /** The Format */
  'Format': string;
  /** The ISBN */
  'ISBN': string;
  /** The URL */
  'URL': string;
  /** The Publication image */
  'Publication image': string;
  /** The Description */
  'Description': any[];
  /** The Color */
  'Color': string;
}

/** CV */
export interface CV {
  /** The Personal data */
  'Personal data': PersonalData[];
  /** The Professional experience */
  'Professional experience': ProfessionalExperience[];
  /** The Education */
  'Education': Education[];
  /** The Certifications */
  'Certifications': Certification[];
  /** The Languages */
  'Languages': Language[];
  /** The Courses */
  'Courses': Course[];
  /** The Publications */
  'Publications': Publication[];
  /** The Countries visited */
  'Countries visited': string[];
}
