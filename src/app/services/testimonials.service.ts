import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {

  constructor(
    private _http: HttpClient
  ) { }

  async getTestimonials() {
    return this._http.get(`${environment.apiUrl}api/testimonials/all`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSingleTestimonials(id) {
    return this._http.get(`${environment.apiUrl}api/testimonials/all/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addTestimonials(body) {
    return this._http.post(`${environment.apiUrl}api/testimonials/add`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editTestimonials(body, id) {
    return this._http.put(`${environment.apiUrl}api/testimonials/edit/${id}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteTestimonials(type = '', id) {
    return this._http.delete(`${environment.apiUrl}api/testimonials/delete/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
}
