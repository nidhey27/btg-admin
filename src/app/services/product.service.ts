import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }


  async addProduct(body, pid) {
    console.log(body);
    
    return this._http.put(`${environment.apiUrl}api/product/${pid}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getProduct(id) {
    return await this._http.get(`${environment.apiUrl}api/product/get/${id}`)
  }
}

