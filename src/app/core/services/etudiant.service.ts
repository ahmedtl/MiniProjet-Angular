import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../Model/Etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  public uri = 'http://localhost:9090';
  
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    })
};
  constructor(private http: HttpClient) {}
  public getAllEtudiant() {
    return this.http.get<Etudiant[]>(this.uri + '/getalletudiant',this.httpOptions);
  }
  addEtudiant(e: Etudiant) {
    //console.log('c:==================> ', c);
    return this.http.post(this.uri + '/addetudiant', e,this.httpOptions);
  }

  updateEtudiant(e: Etudiant): Observable<Object> {
    return this.http.put<Etudiant>(this.uri + '/updateE', e,this.httpOptions);
  }

  getEtudiantById(id: number) {
    return this.http.get<Etudiant>(this.uri + `/getE/${id}`,this.httpOptions);
  }

  deleteEtudiant(id: number): Observable<Object> {
    return this.http.delete(this.uri + `/deleteE/${id}`,this.httpOptions);
  }
}
