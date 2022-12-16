import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../Model/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  public uri = 'http://localhost:9090/teams/';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    })
  };
  
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Team[]>(this.uri,this.httpOptions);
  }
  
  getTeamById(id: number) {
    return this.http.get<Team>(this.uri + `?id=${id}`,this.httpOptions);
  }

  addTeam(t: any) {
    return this.http.post(this.uri + 'add', t,this.httpOptions);
  }

  updateTeam(t: any): Observable<Object> {
    return this.http.put(this.uri + 'update', t,this.httpOptions);
  }

  deleteTeam(id: number): Observable<Object> {
    return this.http.delete(this.uri + `delete/?id=${id}`,this.httpOptions);
  }
}