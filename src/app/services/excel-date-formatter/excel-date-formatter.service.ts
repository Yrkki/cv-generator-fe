import { Injectable } from '@angular/core';

@Injectable()
export class ExcelDateFormatterService {

  constructor() { }

  formatDate(excelDate: any) {
    const date = this.getJsDateFromExcel(excelDate);
    let formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    formattedDate = formattedDate.replace(',', '');
    return formattedDate;
  }

  getJsDateValueFromExcel(excelDate: any) {
    return (excelDate - (25567 + 2)) * 86400 * 1000;
  }

  formatDates(dateFields: any, propertyName: string, propertyValue: any) {
    if (dateFields.indexOf(propertyName) > -1) {
      propertyValue = this.formatDate(propertyValue);
    }
    return propertyValue;
  }

  private getJsDateFromExcel(excelDate: any) {
    return new Date(this.getJsDateValueFromExcel(excelDate));
  }
}
