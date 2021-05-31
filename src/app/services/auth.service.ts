import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _http: HttpClient) { }

  async login(body: any) {
    return await this._http.post(`${environment.apiUrl}api/auth/login`, body)
  }

  async getAllAdmin() {
    return await this._http.get(`${environment.apiUrl}api/auth/admins`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async registerAdmin(body:any) {
    return await this._http.post(`${environment.apiUrl}api/auth/register`, body , {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getOneAdmin(id) {
    return await this._http.get(`${environment.apiUrl}api/auth/admins/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }


  async changePass(body:any , id) {
    return await this._http.put(`${environment.apiUrl}api/auth/change-password/${id}`,body , {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async changeRole(body:any , id) {
    return await this._http.put(`${environment.apiUrl}api/auth/manage-role/${id}`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
}
