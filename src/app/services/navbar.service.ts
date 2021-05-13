import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private _http: HttpClient) { }

  async getMainNav() {
    return await this._http.get(`${environment.apiUrl}api/navbar`)
  }
  async getSubNav() {
    return await this._http.get(`${environment.apiUrl}api/navbar/industry-solution-for`)
  }
}
