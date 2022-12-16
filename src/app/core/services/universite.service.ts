import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Universite } from '../Model/Universite';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    })
};
  constructor(private http : HttpClient) { }
  url: string = 'http://localhost:9090';


  allUni(): Observable<any> {
    return this.http.get(this.url + `/getallUniversite`,this.httpOptions);
  }
  addUniv(universite: Universite){
    return this.http.post(`${this.url}/addUniversite/`, universite,this.httpOptions);
  }
 
 deleteUni(idUniversite: number): Observable<Object> {
    return this.http.delete(this.url + `/deleteUniversite/${idUniversite}`,this.httpOptions);
  }
  getUniversiteById(idUniversite: number): Observable<Universite> {
    return this.http.get<Universite>(this.url + `/universite/${idUniversite}`,this.httpOptions);
  } 
  updateUni(universite: Universite ): Observable<Universite> {
    return this.http.put<Universite>(this.url + `/updateUniversite/`,universite ,this.httpOptions);
  }
}
