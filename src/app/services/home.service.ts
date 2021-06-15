import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _http: HttpClient
  ) { }

  async getMap() {
    return this._http.get(`${environment.apiUrl}api/map/all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addMap(name) {
    console.log(name);
    
    return this._http.post(`${environment.apiUrl}api/map/add`, { name: name }, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  
  async deleteMap(name) {
    return this._http.delete(`${environment.apiUrl}api/map/delete/${name}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

}
