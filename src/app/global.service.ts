import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { User, login } from './DTOS/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  DatosUsuario: any;
  rutaActual: any;
  private URL_BASE = 'https://r00jl7rm-5000.use2.devtunnels.ms/'

  constructor(private router: Router, private http: HttpClient) {
  }

  consultar(endpoint: string, data: any): Observable<any> {
    const url = this.URL_BASE + endpoint;
    return this.http.post(url, data);
  }
}
