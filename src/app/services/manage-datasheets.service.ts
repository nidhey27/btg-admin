import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageDatasheetsService {

  constructor(private _http: HttpClient) { }


  // Categories
  async getCategories(id) {
    return this._http.get(`${environment.apiUrl}api/datasheets/data-sheet-categories/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSingleCategory(id) {
    return this._http.get(`${environment.apiUrl}api/datasheets/data-sheet-category/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addDataSheetCategory(id, body) {
    return this._http.post(`${environment.apiUrl}api/datasheets/add-data-sheet-categories/${id}`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editCategorie(id, body) {
    return this._http.put(`${environment.apiUrl}api/datasheets/edit-data-sheet-categories/${id}`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteCategorie(id) {
    return this._http.delete(`${environment.apiUrl}api/datasheets/delete-data-sheet-cat/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  // Data Sheets
  async getSingleDataSheets(id) {
    return this._http.get(`${environment.apiUrl}api/datasheets/get-data-sheet/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getDataSheets(pid, cid) {
    return this._http.get(`${environment.apiUrl}api/datasheets/data-sheet/${pid}/${cid}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addDataSheet(pid, cid, body) {
    return this._http.post(`${environment.apiUrl}api/datasheets/add-data-sheet/${pid}/${cid}`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role'),
        
      }
    })
  }

  async editDataSheet(cid, body) {
    return this._http.put(`${environment.apiUrl}api/datasheets/edit-data-sheet/${cid}`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role'),
        
      }
    })
  }

  async deleteDataSheet(cid) {
    return this._http.delete(`${environment.apiUrl}api/datasheets/delete-data-sheet/${cid}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role'),
        
      }
    })
  }

}
