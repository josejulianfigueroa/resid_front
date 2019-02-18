import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuracion
import { URL_SERVICIOS } from '../config/config';

@Injectable()
export class JarwisServiceService {
  private baseUrl = URL_SERVICIOS;

  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post(`${this.baseUrl}signup`, data);
  }

  login(data) {
    return this.http.post(`${this.baseUrl}login`, data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}resetPassword`, data);
  }

}
