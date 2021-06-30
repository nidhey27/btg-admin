import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(
    private _http: HttpClient
  ) { }

  async getCareerApplication() {
    return this._http.get(`${environment.apiUrl}api/careers/get-all-job-applications`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getCareer() {
    return this._http.get(`${environment.apiUrl}api/careers/all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSingleCareer(id) {
    return this._http.get(`${environment.apiUrl}api/careers/all/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addCareer(body) {
    return this._http.post(`${environment.apiUrl}api/careers/add`, body,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editCareer(body, id) {
    return this._http.put(`${environment.apiUrl}api/careers/update/${id}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteCareer(id) {
    return this._http.delete(`${environment.apiUrl}api/careers/delete/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
}
