export class CV implements CV {
  'Personal data': PersonalData[];
  'Professional experience': ProfessionalExperience[];
  'Education': Education[];
  'Certifications': Certification[];
  'Languages': Language[];
  'Courses': Cours[];
  'Publications': Publication[];
}

export interface PersonalData {
  'Caption': string;
  'Personal data': string;
}

export interface ProfessionalExperience {
  'Id': number;
  'Period': string;
  'Experience': string;
  'Position': string;
  'Description': string[];
  'Link': string;
  'Experience image': string;
}

export interface Education {
  'Id': number;
  'Period': string;
  'School': string;
  'Degree': string;
  'Field': string;
  'Grade': string;
  'Description': string;
  'Link': string;
  'Education image': string;
}

export interface Certification {
  'Id': number;
  'Name': string;
  'URL': string;
  'Authority name': string;
  'Authority URL': string;
  'Authority image': string;
  'Type': string;
  'Level': string;
  'Location': string;
  'Started': number;
  'Completed': number;
  'Expiration?': number;
  'Certificate number': string;
  'Certificate URL': string;
  'Certificate image': string;
  'Certificate image URL': string;
  'Certificate logo': string;
  'Certificate tag': string;
  'Color': string;
}

export interface Language {
  'Language': string;
  'Level': string;
  'Score': number;
  'Share': number;
}

export interface Cours {
  'Id': number;
  'Name': string;
  'URL': string;
  'Authority name': string;
  'Authority URL': string;
  'Authority image': string;
  'Type': string;
  'Level': string;
  'Location': string;
  'Started': number;
  'Completed': number;
  'Expiration?': any;
  'Certificate number': string;
  'Certificate URL': string;
  'Certificate image': string;
  'Certificate image URL': string;
  'Certificate logo': string;
  'Certificate tag': string;
  'Color': string;
}

export interface Publication {
  'Id': number;
  'Article': string;
  'Article author': string;
  'Article date': string;
  'Title': string;
  'Subtitle': string;
  'Translation Article': string;
  'Translation Title': string;
  'Translation Subtitle': string;
  'Translator': string;
  'Editor': string;
  'Publisher': string;
  'Publication date': string;
  'Type': string;
  'Author': string;
  'City': string;
  'Page count': string;
  'Pages': string;
  'Size': string;
  'Format': string;
  'ISBN': string;
  'URL': string;
  'Publication image': string;
  'Description': any[];
}

export interface CV {
  'Personal data': PersonalData[];
  'Professional experience': ProfessionalExperience[];
  'Education': Education[];
  'Certifications': Certification[];
  'Languages': Language[];
  'Courses': Cours[];
  'Publications': Publication[];
}
