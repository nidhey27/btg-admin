import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _http: HttpClient
  ) { }

  async getCarousal() {
    return this._http.get(`${environment.apiUrl}api/home/all`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addCarsoule(type) {
    return this._http.post(`${environment.apiUrl}api/home/add`, { type }, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getMap() {
    return this._http.get(`${environment.apiUrl}api/map/all`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addMap(name) {
    console.log(name);

    return this._http.post(`${environment.apiUrl}api/map/add`, { name: name }, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteMap(name) {
    return this._http.delete(`${environment.apiUrl}api/map/delete/${name}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  //  See What We Do

  async getSeeWhatWeDo() {
    return this._http.get(`${environment.apiUrl}api/seewhatwedo/all`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async getSingleSeeWhatWeDo(id) {
    return this._http.get(`${environment.apiUrl}api/seewhatwedo/all/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addSeeWhatWeDo(body) {
    return this._http.post(`${environment.apiUrl}api/seewhatwedo/add`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editSeeWhatWeDo(id, body) {
    return this._http.put(`${environment.apiUrl}api/seewhatwedo/edit/${id}`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async deleteSeeWhatWeDo(id) {
    return this._http.delete(`${environment.apiUrl}api/seewhatwedo/delete/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  // Contact Us
  async getContactUs() {
    return this._http.get(`${environment.apiUrl}api/ContactSection/all`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  async getSingleContactUs(id) {
    return this._http.get(`${environment.apiUrl}api/ContactSection/all/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async editContactUs(id, body) {
    return this._http.put(`${environment.apiUrl}api/ContactSection/edit/${id}`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }

  async addContactUs(body) {
    return this._http.post(`${environment.apiUrl}api/ContactSection/add`, body, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
  async deleteContactUs(id) {
    return this._http.delete(`${environment.apiUrl}api/ContactSection/delete/${id}`, {
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "role": localStorage.getItem('role')
      }
    })
  }
}
