import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  setDataToStorage(data: object) {
    let preData = this.getDataFromStorage();
    if (Object.keys(preData).length) {
      preData.push(data);
      localStorage.setItem("data", JSON.stringify(preData));
    } else {
      localStorage.setItem("data", JSON.stringify([data]));
    }
  }

  getDataFromStorage() {
    return JSON.parse(localStorage.getItem("data") || '{}')
  }
}
