import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }


  async addProduct(body, pid) {
    return this._http.post(`${environment.apiUrl}api/product/add/${pid}`, body, {
      headers:{
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
}
