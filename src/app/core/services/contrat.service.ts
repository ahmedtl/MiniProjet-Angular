import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contrat } from '../Model/Contrat';
import { Observable } from 'rxjs';
import { Specialite } from '../Model/Specialite';
@Injectable({
  providedIn: 'root',
})
export class ContratService {
  public uri = 'http://localhost:9090';
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    })
};
  constructor(private http: HttpClient) {}
  getAllContrat() {
    return this.http.get<Contrat[]>(this.uri + '/getallcontrat',this.httpOptions);
  }
  addContrat(c: Contrat) {
    //console.log('c:==================> ', c);
    return this.http.post(this.uri + '/addcontrat', c,this.httpOptions);
  }

  updateContrat(contrat: Contrat): Observable<Object> {
    return this.http.put<Contrat>(this.uri + '/updatecontrat', contrat,this.httpOptions);
  }

  getContratById(id: number) {
    return this.http.get<Contrat>(this.uri + `/getContrat/${id}`,this.httpOptions);
  }

  deleteContrat(id: number): Observable<Object> {
    return this.http.delete(this.uri + `/deleteContrat/${id}`,this.httpOptions);
  }

  getContractByOption(s : Specialite ){
    return this.http.get(this.uri+`/getContractByOption/${s}`,this.httpOptions)
  }

  ContractDateIsNear(idContrat: number){
    return this.http.get(this.uri+`/DateContractIsNear/${idContrat}`,this.httpOptions)
  }

  addAndAffectContrat(
    id: any,
    data: {
      dateDebutContrat: Date;
      dateFinContrat: Date;
      archive: Boolean;
      specialite: Specialite;
      montantContrat: number;
      descriptionContrat: string;
    }
  ) {
    return this.http.post(this.uri + '/addcontratAndAffectIt/' + id, data,this.httpOptions);
  }
}
