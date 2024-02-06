import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpContextToken, } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
        private http: HttpClient,

  ) { }

    async getDatos() {
    var headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    headers.append('Origin', 'capacitor://localhost');
    headers.append('Access-Control-Allow-Origin', 'capacitor://localhost');
    headers.append('Access-Control-Allow-Headers', 'origin, x-requested-with');

 
    const data = await this.http.get<any>(`http://localhost:4000/`, {
      headers: headers,
    }).toPromise();

    return data
  }
}
