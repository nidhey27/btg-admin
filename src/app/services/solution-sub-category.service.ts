import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolutionSubCategoryService {

  constructor(
    private _http: HttpClient
  ) { }

  async addSolutionSubCategory(body, pid) {
    return this._http.put(`${environment.apiUrl}api/solutionsubcategory/${pid}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSolutionSubCategory(id) {
    return await this._http.get(`${environment.apiUrl}api/solutionsubcategory/get/${id}`)
  }
}
