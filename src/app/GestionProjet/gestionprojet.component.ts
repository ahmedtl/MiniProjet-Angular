import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Projet } from '../core/Model/Projet';
import { Tache } from '../core/Model/Tache';
import { ProjetService } from '../core/services/projet.service';
import { TacheService } from '../core/services/tache.service';

@Component({
  selector: 'app-gestionprojet',
  templateUrl: './gestionprojet.component.html',
  styleUrls: ['./gestionprojet.component.css']
})
export class GestionprojetComponent implements OnInit {
  @Input() IdProjet : Projet;
  list_tache:Tache[]
  isSubmitted = false;
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];
  constructor(private modalService: NgbModal,private tacheservice :TacheService,
    private projetService:ProjetService,public activeModal1: NgbActiveModal,private route:Router,public fb: FormBuilder,private toastr: ToastrService) { }
    registrationForm = this.fb.group({
      cityName: ['', [Validators.required]],
    });
    tacheList: Tache[];
    projetList: Projet[];
  projet: Projet;
    tache :Tache;
  ngOnInit(): void {
    this.allTache();
    this.tache = new Tache(); 
    this.allProjet();
    this.projet = new Projet();
    

}

getProjetById()
{this.projetService.get(this.IdProjet).subscribe(
  (res) => {
    console.log(res);
    this.projet = res;
  }
);

}

allTache() {

this.tacheservice.getAllT().subscribe((res) => {
  this.tacheList = res;
  
});
}
allProjet() {
this.projetService.getAll().subscribe((res) => {
  this.projetList = res;
});
}
handleOptionChange() {
  console.log(this.tache);
}
allTacheByProjet(nom:any) {
  this.tacheservice.getTacheByProjet(nom).subscribe((res) => {
    this.projetList = res;
  });
}
changeCity(e: any) {
  this.cityName?.setValue(e.target.value, {
    onlySelf: true,
  });
}
// Access formcontrols getter
get cityName() {
  return this.registrationForm.get('cityName');
}
onSubmit(): void {
  console.log(this.projet.nomProjet);
  console.log(this.tache);
  console.log(this.projet.nomProjet);
  // this.isSubmitted = true;
  // if (!this.registrationForm.valid) {
  //   false;
  // } else {
  //   // console.log(JSON.stringify(this.registrationForm.value));
  // }
}
addtache(nomT:Tache,nomP:Projet) {
  console.log(nomP.nomProjet);
  console.log(nomT.libelle);

  this.tacheservice.aadTachetoProjet(nomT.libelle,nomP.nomProjet).subscribe((res) => {
    console.log("success");
  });
  this.toastr.success(nomT.libelle+" Affecter avec Succces à "+nomP.nomProjet);  

}
Show_taches(){
  if (this.projet.nomProjet) {
    if (this.projet.nomProjet?.length>0)
      this.tacheservice.getTacheByProjet(this.projet.nomProjet).subscribe((res) => {
        this.list_tache = res;
        console.log(res)
  });
}
}
}
