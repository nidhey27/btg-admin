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

  async getAnLeadership(id) {
    return this._http.get(`${environment.apiUrl}api/leadership/all/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addLeadership(name, designation) {
    return this._http.post(`${environment.apiUrl}api/leadership/add`,{name, designation}, {
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

  // Compliance Whistleblowing
  async getComWhistle() {
    return this._http.get(`${environment.apiUrl}api/complianceWhistleblowing/all-complicane`)
  }

  async addComWhistle() {
    return this._http.post(`${environment.apiUrl}api/complianceWhistleblowing/all-complicane-add`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  
  async editComWhistle(data, id) {
    return this._http.put(`${environment.apiUrl}api/complianceWhistleblowing/edit-complicane/${id}`, data,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  // Compliance Whistleblowing Category
  async getComWhistleCategory() {
    return this._http.get(`${environment.apiUrl}api/complianceWhistleblowing/all-complicane-category`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSingleComWhistleCategory(id) {
    return this._http.get(`${environment.apiUrl}api/complianceWhistleblowing/all-complicane-category/${id}`)
  }

  async addComWhistleCategory(body) {
    return this._http.post(`${environment.apiUrl}api/complianceWhistleblowing/add-complicane-category`,body ,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  
  async editComWhistleCategory(data, id) {
    return this._http.put(`${environment.apiUrl}api/complianceWhistleblowing/edit-complicane-category/${id}`, data,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteComWhistleCategory(id) {
    return this._http.delete(`${environment.apiUrl}api/complianceWhistleblowing/delete-complicane-category/${id}`,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  // Compliance Whistleblowing Category
  async getComWhistleCategoryHelpdesk(id) {
    return this._http.get(`${environment.apiUrl}api/complianceWhistleblowing/helpdesk-contact-data/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSingleComWhistleCategoryHelpdesk(id) {
    return this._http.get(`${environment.apiUrl}api/complianceWhistleblowing/helpdesk-contact-data/${id}`)
  }

  async getSingleComWhistleCategoryHelpdeskOne(id) {

    console.log('Fuck Service')
    return this._http.get(`${environment.apiUrl}api/complianceWhistleblowing/helpdesk-contact-data-an/${id}`)
  }

  async addComWhistleCategoryHelpdesk(body) {
    return this._http.post(`${environment.apiUrl}api/complianceWhistleblowing/add-helpdesk-contact/`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  
  async editComWhistleCategoryHelpdesk(data, id) {
    return this._http.put(`${environment.apiUrl}api/complianceWhistleblowing/edit-helpdesk-contact/${id}`, data,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteComWhistleCategoryHelpdesk(id) {
    return this._http.delete(`${environment.apiUrl}api/complianceWhistleblowing/delete-helpdesk-contact/${id}`,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }


}
