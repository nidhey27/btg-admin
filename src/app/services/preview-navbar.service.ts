import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private _http:HttpClient) { }

  async getMainNav() {
    return await this._http.get(`${environment.apiUrl}api/navbar`)
  }
  async getSubNav() {
    return await this._http.get(`${environment.apiUrl}api/navbar/industry-solution-for`)
  }
  async getIndustrySolutionFor() {
    return await this._http.get(`${environment.apiUrl}api/navbar/industry-solution-for`)
  }

  async getsolutionMainCategoryFor(id) {
    return await this._http.get(`${environment.apiUrl}api/navbar/solution-main-category/${id}`)
  }

  async getsolutionSubCategoryFor(id) {
    return await this._http.get(`${environment.apiUrl}api/navbar/solution-sub-category/${id}`)
  }
  async getproductMainCategory(id) {
    return await this._http.get(`${environment.apiUrl}api/navbar/product-main-category/${id}`)
  }

  async getProductMainCategoryData(id) {
    return await this._http.get(`${environment.apiUrl}api/product/get/${id}`)
  }
}



