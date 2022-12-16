import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detail } from '../Model/Detail';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  public uri = 'http://localhost:9090/teams/details/';

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    })
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Detail[]>(this.uri,this.httpOptions);
  }

  getDetailById(id: number) {
    return this.http.get<Detail>(this.uri + `?id=${id}`,this.httpOptions);
  }

  addDetail(t: any) {
    return this.http.post(this.uri + 'add', t,this.httpOptions);
  }

  updateDetail(t: any): Observable<Object> {
    return this.http.put(this.uri + 'update', t,this.httpOptions);
  }

  deleteDetail(id: number): Observable<Object> {
    return this.http.delete(this.uri + `delete/?id=${id}`,this.httpOptions);
  }
}
