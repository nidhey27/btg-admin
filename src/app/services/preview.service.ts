import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  data: any = [];
  constructor() { }

  async saveData(data, heading){
    localStorage.setItem('previewData', JSON.stringify(data))
    localStorage.setItem('previewHeading', JSON.stringify(heading))
  }

  async getData(){
    let data = { 
        heading: JSON.parse(localStorage.getItem('previewHeading')),
        data: JSON.parse(localStorage.getItem('previewData'))
      };
      return data;
    }
}
