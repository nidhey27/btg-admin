import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(
    private _http: HttpClient
  ) { }


// Teams API
  async getTeams() {
    return this._http.get(`${environment.apiUrl}api/teams/all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSingleTeam(id) {
    return this._http.get(`${environment.apiUrl}api/teams/all/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addTeam(body) {
    return this._http.post(`${environment.apiUrl}api/teams/add`, body,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editTeam(body, id) {
    return this._http.put(`${environment.apiUrl}api/teams/edit/${id}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteTeam(id) {
    return this._http.delete(`${environment.apiUrl}api/teams/delete/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  // History
  async getHistory() {
    return this._http.get(`${environment.apiUrl}api/history/all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  
  async editHistory(data, id) {
    return this._http.put(`${environment.apiUrl}api/history/edit/${id}`, data,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  // Export Compliance

  async getCompliance() {
    return this._http.get(`${environment.apiUrl}api/export-control/all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  
  async editCompliance(data, id) {
    return this._http.put(`${environment.apiUrl}api/export-control/edit/${id}`, data,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  // About

  async getAbout() {
    return this._http.get(`${environment.apiUrl}api/about/all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  
  async editAbout(data, id) {
    return this._http.put(`${environment.apiUrl}api/about/edit/${id}`, data,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getLeadership() {
    return this._http.get(`${environment.apiUrl}api/leadership/all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  async editLeadership(data, id) {
    return this._http.put(`${environment.apiUrl}api/leadership/edit/${id}`, data,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  async deleteLeadership(data, id) {
    return this._http.put(`${environment.apiUrl}api/leadership/delete/${id}`, data,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

}
