import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommingSoonService {

  constructor(
    private _http: HttpClient
  ) { }

  async getComingSoon() {
    return this._http.get(`${environment.apiUrl}api/comingSoon/get-all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editCommingSoon(body, id) {
    return this._http.put(`${environment.apiUrl}api/comingSoon/update/${id}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

}
