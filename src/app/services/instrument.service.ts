import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  constructor(
    private _http: HttpClient
  ) { }
    
  async getInstrument(id) {
    return this._http.get(`${environment.apiUrl}api/instrumnet/all/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addInstrument(body) {
    return this._http.post(`${environment.apiUrl}api/instrumnet/add`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editInstrument(body, id) {
    return this._http.put(`${environment.apiUrl}api/instrumnet/edit/${id}`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteInstrument(id) {
    return this._http.delete(`${environment.apiUrl}api/instrumnet/delete/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
}
