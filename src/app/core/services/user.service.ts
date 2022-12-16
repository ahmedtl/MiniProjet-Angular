import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../Model/Account';
import { Etudiant } from '../Model/Etudiant';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:9090';
  currentUser = JSON.parse(localStorage.getItem('user') as any);

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });//marcher sans kay

  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    })
} 
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService,
  ) {}

  public login(loginData:any) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public register(loginData:any) {
    return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', loginData, {
      headers: this.requestHeader,
    });
  }

  public assigntoaccount(e:Etudiant) {
    return this.httpclient.post(this.PATH_OF_API + `/assigntoaccount/${this.currentUser.userName}`, e, this.httpOptions/*{
      headers: this.requestHeader,
    }*/);
  }
  public deletaccount(userName:string){
    return this.httpclient.delete(this.PATH_OF_API + `/deleteAccount/${userName}`,this.httpOptions);
  }

  getAllAccount() {
    return this.httpclient.get<Account[]>(this.PATH_OF_API + '/getallaccount',this.httpOptions);
  }

  public updateAcount(account:Account) {
    return this.httpclient.put(this.PATH_OF_API + '/updateaccount',account,this.httpOptions);
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles:any): boolean | any {
    let isMatch= false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
