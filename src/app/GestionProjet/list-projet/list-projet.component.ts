import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Projet } from 'src/app/core/Model/Projet';
import { Tache } from 'src/app/core/Model/Tache';
import { ProjetService } from 'src/app/core/services/projet.service';
import { TacheService } from 'src/app/core/services/tache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GestionprojetComponent } from '../gestionprojet.component';
import { AddTacheProComponent } from '../add-tache-pro/add-tache-pro.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.css']
})
export class ListProjetComponent implements OnInit {
  Taches:any;
  allTaches:number=0;
  pagination:number=1;
  constructor(private projetService :ProjetService, private  Tss:TacheService , private modalService: NgbModal,
   private route:Router ,private toastr: ToastrService,public userService: UserService) { }

  projet: Projet;
  search: string;

  projetList: Projet[];
  tacheList: Tache[]; 
  ngOnInit(): void {
    this.allProjet();
    this.projet = new Projet();
    
  
  }
  setSearch(event:any){
    console.log("value",event.target.value);
    this.search =event.target.value;
  }
  FindbyNom(){
    
    this.projetService.findByNom(this.search).subscribe((res) => {
      console.log("list from res :",res);
      if (res.length!=0){
        this.projetList = res;
      }
      else{
        this.projetList = [];
      }
      
    });

  }
  allProjet() {
    this.projetService.getAll().subscribe((res) => {
      this.projetList = res;
    });
  }
  //addContract
  add() {
    this.projetService.create
      (this.projet)
      .subscribe(
        () => (this.projetList = [this.projet, ...this.projetList])
      );
  }
  deleteProjet(idProjet: any) {
    this.projetService.delete(idProjet).subscribe((data) => {
      console.log(data);
      this.allProjet();
    });
    this.toastr.error("Projet Supprimer!");  

  }
  //updateContract
  postList(): void {
    this.projetService.getAll().subscribe((data: Projet[]) => {
      this.projetList = data;
    });
  }
  updateProjet(idProjet: any) {
    this.route.navigate(['/gestionprojet/projet/putProjet', idProjet]);
  }
  getAllT()
  { 
    this.Tss.getAllT().subscribe((res) => {
      this.tacheList = res;
    });
  }
  
open(id :any) {
  const modalRef = this.modalService.open(GestionprojetComponent);
  modalRef.componentInstance.idProjet = id ;
  console.log("value",id);
}

openTache() {
  const modalRef = this.modalService.open(AddTacheProComponent);
}
fetchTache() {
  this.projetService.getProjet(this.pagination).subscribe((res: any) => { 
  this.Taches=res.data;
  this.allTaches=res.total;
  console.log(res.total);
  });
}
renderPage(event:number){
  this.pagination=event;
  this.fetchTache();
}
getPrix(nomP:any){
  this.projetService.calculPrix(nomP).subscribe((res: any) => { 
    this.Taches=res.data;
    console.log("value",nomP);
    location.reload();
});

}
}