import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndustrySolForService {

  constructor( private _http: HttpClient) { }

  async getIndSolFor(id) {
    return this._http.get(`${environment.apiUrl}api/industry-sol-for/get/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  
  async editIndSolFor(parentId, childId, body) {
    return this._http.put(`${environment.apiUrl}api/industry-sol-for/edit/${parentId}/${childId}`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
}
