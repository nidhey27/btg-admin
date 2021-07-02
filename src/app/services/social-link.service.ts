import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialLinkService {

  constructor(
    private _http: HttpClient
  ) { }

  async getSocial() {
    return this._http.get(`${environment.apiUrl}api/manage-social-links/all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSingleSocial(id) {
    return this._http.get(`${environment.apiUrl}api/manage-social-links/all/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addSocial(body) {
    return this._http.post(`${environment.apiUrl}api/manage-social-links/add`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editSocial(body, id) {
    return this._http.put(`${environment.apiUrl}api/manage-social-links/edit/${id}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteSocial(id) {
    return this._http.delete(`${environment.apiUrl}api/manage-social-links/delete/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  
}
