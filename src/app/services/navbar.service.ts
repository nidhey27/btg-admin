import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private _http: HttpClient) { }

  // Get
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


  // Post

  async addIndustrySolutionFor(body:any) {
    return await this._http.post(`${environment.apiUrl}api/navbar/add/industry-solution-for` , body , {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }

  async addsolutionMainCategoryFor(body:any , id) {
    return await this._http.post(`${environment.apiUrl}api/navbar/add/solution-main-category/${id}` , body , {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }



  async addsolutionSubCategoryFor(body:any , id) {
    return await this._http.post(`${environment.apiUrl}api/navbar/add/solution-sub-category/${id}` , body , {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }

  async addproductMainCategory(body:any , id) {
    return await this._http.post(`${environment.apiUrl}api/navbar/add/product-main-category/${id}` , body , {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }

  // Update

  async updateIndustrySolutionFor(body:any,id) {
    return await this._http.put(`${environment.apiUrl}api/navbar/update/industry-solution-for/${id}`, body , {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }

  async updatesolutionMainCategoryFor(body:any,id) {
    return await this._http.put(`${environment.apiUrl}api/navbar/update/solution-main-category/${id}`, body , {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }

  async updatesolutionSubCategoryFor(body:any,id) {
    return await this._http.put(`${environment.apiUrl}api/navbar/update/solution-sub-category/${id}`, body , {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }

  async updateproductMainCategory(body:any,id) {
    return await this._http.put(`${environment.apiUrl}api/navbar/update/product-main-category/${id}`, body , {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }


  // Delete
  async deleteIndustrySolutionFor(id) {
    return await this._http.delete(`${environment.apiUrl}api/navbar/industry-solution-for/${id}` , {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }

  async deletesolutionMainCategoryFor(id) {
    return await this._http.delete(`${environment.apiUrl}api/navbar/solution-main-category/${id}`, {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }

  
  async deletesolutionSubCategoryFor(id) {
    return await this._http.delete(`${environment.apiUrl}api/navbar/solution-sub-category/${id}` , {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }

  async deleteproductMainCategory(id) {
    return await this._http.delete(`${environment.apiUrl}api/navbar/product-main-category/${id}` , {
      headers:{
        "auth-token": localStorage.getItem('auth-token')
      }
    })
  }

}




