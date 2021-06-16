import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private _http: HttpClient
  ) { }

  async getNews() {
    return this._http.get(`${environment.apiUrl}api/newsandpressrelease/all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSingleNews(id) {
    return this._http.get(`${environment.apiUrl}api/newsandpressrelease/all/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addNews(body) {
    return this._http.post(`${environment.apiUrl}api/newsandpressrelease/add`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editNews(body, id) {
    return this._http.put(`${environment.apiUrl}api/newsandpressrelease/edit/${id}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteNews(type = '', id) {
    return this._http.delete(`${environment.apiUrl}api/newsandpressrelease/delete/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

}
