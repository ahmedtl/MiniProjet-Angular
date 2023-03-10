import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../Model/Department';
import { Etudiant } from '../Model/Etudiant';
import { Universite } from '../Model/Universite';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private url='http://localhost:9090';
  allUniversites: Universite[];
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    })
};
  constructor(private http : HttpClient) { }
 


  getAlldep() {
    return this.http.get<Departement[]>(this.url + `/getallDepartement`,this.httpOptions);
  }
  getAllUniv() {
    return this.http.get<Universite[]>(this.url + `/getUniversiteee`,this.httpOptions);
  }
  getEtudiantDep(id: any): Observable<any> {
    return this.http.get<any>(this.url + `/findEtudiantByIdDepart/${id}`,this.httpOptions);
  } 
  
getallEtudiant() {
  return this.http.get<Etudiant[]>(this.url + `/getallEtudiant`,this.httpOptions);
}


addDepartment(departement:Departement): Observable<Object> {
    return this.http.post<Object>( this.url+ `/addDepartement/`,departement,this.httpOptions);
  }

  addDeparttouni(id: any,data:{
    nomDepartement:string;
    type:string;
    code:string;
    description:string;
  }): Observable<Departement> {
    return this.http.post<Departement>(this.url +'/addnewDepartToUniv/'+id, data,this.httpOptions)
  }

  //updateDepartment(idDepart: number,department: department): Observable<Object> {
    //return this.http.put(this.url + `/putDep/${idDepart}`, department);
 // }
   getUniversites() : Observable<Universite[]>{
  return this.http.get<Universite[]>(this.url + '/getallUniversite', this.httpOptions)
}

 
  deleteDepartment(idDepartement: number): Observable<Object> {
    return this.http.delete(this.url + `/deleteDepartement/${idDepartement}`,this.httpOptions);
  }
  getDepartmentById(idDepartement: number): Observable<Departement> {
    return this.http.get<Departement>(this.url + `/getDepart/${idDepartement}`,this.httpOptions);
  } 
 
  updateDepartment(department: Departement): Observable<Departement> {
    return this.http.put<Departement>(this.url + `/putDepatement/`,department,this.httpOptions);
  }
  exportPDF(): Observable<any> {
    return this.http.get<Departement>(this.url + `/pdfDownload`,{
      responseType: 'blob' as 'json'});
  }
  Getdepart (nomUniversite:String){
    return this.http.get<Departement>(this.url + `/getdepartbyUniv/${nomUniversite}`,this.httpOptions);}


    getDepartmentByIdList(idDepartement: number): Observable<any[]> {
      return this.http.get<any[]>(this.url + `/getDepart/${idDepartement}`,this.httpOptions);
    } 
   
    getDepartmentByIdUniv(nomUniversite: String): Observable<Departement[]> {
      return this.http.get<Departement[]>(this.url + `/getDepartmentUniversite/${nomUniversite}`,this.httpOptions);
    } 
    
 
   
    updateDepart(idDepartement: number,department: Departement): Observable<any> {
      return this.http.put(this.url + `/updateDepartement/${idDepartement}`,department,this.httpOptions
      );
    }
}
