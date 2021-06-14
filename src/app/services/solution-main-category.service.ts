import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolutionMainCategoryService {

  constructor(
    private _http: HttpClient
  ) { }

  async addSolutionMainCategory(body, pid) {
    return this._http.put(`${environment.apiUrl}api/solutionmaincategory/${pid}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSolutionMainCategory(id) {
    return await this._http.get(`${environment.apiUrl}api/solutionmaincategory/get/${id}`)
  }
}
