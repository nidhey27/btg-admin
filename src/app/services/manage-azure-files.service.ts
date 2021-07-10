import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ManageAzureFilesService {

  constructor(private _http: HttpClient) { }

  async getAll() {
    return this._http.get(`${environment.apiUrl}api/uploadFilestoAzure/`)
  }
  async getSingle(id) {
    return this._http.get(`${environment.apiUrl}api/uploadFilestoAzure/${id}`)
  }

  async addFile(body) {
    return this._http.post(`${environment.apiUrl}api/uploadFilestoAzure/add`, body,{
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editFile(body, id) {
    return this._http.put(`${environment.apiUrl}api/uploadFilestoAzure/edit/${id}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteFile(id) {
    return this._http.delete(`${environment.apiUrl}api/uploadFilestoAzure/delete/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

}
