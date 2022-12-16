import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../Model/Tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private url = 'http://localhost:9090/api/Tache';
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    })
};
  nom :any;
  constructor(private http: HttpClient) { }
  getAllT(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.url+"/getallTaches",this.httpOptions);
  }
  findByNom(nom: any): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.url+"/getprojetbynom/"+nom,this.httpOptions);
  }

  get(id: any): Observable<Tache> {
    return this.http.get<Tache>(`${this.url}/getTache/${id}`,this.httpOptions);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.url+"/addTache", data,this.httpOptions);
  }
 
  updateTache(projet: Tache): Observable<any>
   { return this.http.put<Tache>(this.url  + `/updateTache/`,projet,this.httpOptions); }
  

  /*delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl+"/deleteProjet"}/${id}`);
  }*/
  delete(idProjet: any): Observable<Object> {
    return this.http.delete(this.url + `/deleteTache/${idProjet}`,this.httpOptions);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }

  findByTitle(title: any): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.url}?title=${title}`,this.httpOptions);
  }
  aadTachetoProjet(nomT:String,nomP:any)  {
    return this.http.post(`${this.url}/affectTtoProjet/${nomT}/${nomP}`,new Tache(),this.httpOptions);
  }
  getTache(page: number) {
    return this.http.get(this.url + '?page=' + page,this.httpOptions);
  }
  TrierASD():Observable<Tache[]>{
    return this.http.get<Tache[]>(this.url+"/retrieve-tacheASC",this.httpOptions);
  }


TrierDESC():Observable<Tache[]>{
  return this.http.get<Tache[]>(this.url+"/retrieve-tacheDESC",this.httpOptions);
}
getTacheByProjet(id: any): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}/getTacheByProjet/${id}`,this.httpOptions);
}
}
