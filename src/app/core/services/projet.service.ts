import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../Model/Projet';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private url = 'http://localhost:9090/api/Projet';
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    })
};

  constructor(private http: HttpClient) { }

  getAll(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.url+"/getallProjets",this.httpOptions);
  }
  findByNom(nom: any): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.url+"/getprojetbynom/"+nom,this.httpOptions);
  }

  get(id: any): Observable<Projet> {
    return this.http.get<Projet>(`${this.url}/getProjet/${id}`,this.httpOptions);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.url+"/addProjet", data,this.httpOptions);
  }
 
  updateProjet(projet: Projet): Observable<any>
   { return this.http.put<Projet>(this.url  + `/updateProjet/`,projet,this.httpOptions); }
  

  /*delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl+"/deleteProjet"}/${id}`);
  }*/
  delete(idProjet: any): Observable<Object> {
    return this.http.delete(this.url + `/deleteProjet/${idProjet}`,this.httpOptions);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }

  findByTitle(title: any): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.url}?title=${title}`,this.httpOptions);
  }
  getProjet(page: number) {
    return this.http.get(this.url + '?page=' + page,this.httpOptions);
  }
  calculPrix(nom:any){
    return this.http.get(`${this.url}/CalculPrix/${nom}`,this.httpOptions);
  }
}
