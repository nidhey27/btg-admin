import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContactBtgService {

  constructor(
    private _http: HttpClient
  ) { }

  async getAllContacts() {
    return this._http.get(`${environment.apiUrl}api/contact/get-all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  
  async getContacts(search) {
    return this._http.get(`${environment.apiUrl}api/contact/get/${search}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSingleContact(country, id) {
    return this._http.get(`${environment.apiUrl}api/contact/get/${country}/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteSingleContact(country, id) {
    return this._http.delete(`${environment.apiUrl}api/contact/delete/${country}/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addContact(body) {
    return this._http.post(`${environment.apiUrl}api/contact/add-single`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editSingleContact(body, country, id) {
    return this._http.put(`${environment.apiUrl}api/contact/edit/${country}/${id}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addFileContact(body) {
    return this._http.post(`${environment.apiUrl}api/contact/uploadfile`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

}
