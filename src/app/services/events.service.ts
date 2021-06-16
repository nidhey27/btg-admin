import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private _http: HttpClient
  ) { }
  
  async getEvent() {
    return this._http.get(`${environment.apiUrl}api/events/all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSingleEvent(id) {
    return this._http.get(`${environment.apiUrl}api/events/all/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addEVent(body) {
    return this._http.post(`${environment.apiUrl}api/events/add`, body,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editEvent(id, body) {
    return this._http.put(`${environment.apiUrl}api/events/edit/${id}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteEvent(id) {
    return this._http.delete(`${environment.apiUrl}api/events/delete/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
}
