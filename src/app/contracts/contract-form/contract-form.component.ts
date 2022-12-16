import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'src/app/core/Model/Etudiant';
import { Specialite } from 'src/app/core/Model/Specialite';
import { EtudiantService } from 'src/app/core/services/etudiant.service';
import { Contrat } from '../../core/Model/Contrat';
import { ContratService } from '../../core/services/contrat.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css'],
  providers: [DatePipe],
})
export class ContractFormComponent implements OnInit {
  constructor(
    private datePipe: DatePipe,
    private contratService: ContratService,
    private route: Router,
    private currentRoute: ActivatedRoute,
    private etudiantService: EtudiantService
  ) {}
  cloud: Specialite.CLOUD;
  reseau: Specialite.RESEAU;
  IA: Specialite.IA;
  SECURITE: Specialite.SECURITE;
  contrat: Contrat;
  action: string;
  contratList: Contrat[];
  currentDate = new Date();
  mindate: any;
  isUnchanged = false;
  etudiant: Etudiant;
  etudiantList: Etudiant[];
  idEtudiant: any;
  ngOnInit(): void {
    this.etudiant = new Etudiant();
    this.mindate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.contrat = new Contrat();
    let id = this.currentRoute.snapshot.params['id'];

    if (id != null) {
      //update
      this.action = 'Update';
      this.contratService.getContratById(id).subscribe((data: Contrat) => {
        this.contrat = data;
      });
      console.log('=================>' + this.contrat);
    } else {
      //add
      this.action = 'Add New';
      this.contrat = new Contrat();
    }

    //get
    this.contratService.getAllContrat().subscribe((data: Contrat[]) => {
      this.contratList = data;
    });
    //getAllStudents
    this.etudiantService.getAllEtudiant().subscribe((data: Etudiant[]) => {
      this.etudiantList = data;
    });
  }

  //add|update
  add(form: NgForm) {
    if (this.action == 'update') {
      this.contratService
        .updateContrat(this.contrat)
        .subscribe(() => console.log('complete'));
      location.reload();
    } else if (this.contrat.dateDebutContrat < this.contrat.dateFinContrat) {
      let obj: any = {};
      obj.dateDebutContrat = form.value.dateDebutContrat;
      obj.dateFinContrat = form.value.dateFinContrat;
      obj.archive = false;
      obj.specialite = form.value.specialite;
      obj.montantContrat = form.value.montantContrat;
      obj.descriptionContrat = form.value.descriptionContrat;
      this.contratService
        .addAndAffectContrat(this.idEtudiant, obj)
        .subscribe((res: any) => {
          console.log('Done');
        });
      this.route.navigate(['/contracts/ContractsList']);
    }
    console.log('You have a problem!');
  }

  //add khw
  addAndAffectContract(form: NgForm) {
    let obj: any = {};
    obj.dateDebutContrat = form.value.dateDebutContrat;
    obj.dateFinContrat = form.value.dateFinContrat;
    obj.archive = false;
    obj.specialite = form.value.specialite;
    obj.montantContrat = form.value.montantContrat;
    obj.descriptionContrat = form.value.descriptionContrat;
    this.contratService
      .addAndAffectContrat(this.idEtudiant, obj)
      .subscribe((res: any) => {
        console.log('Done');
      });
    this.route.navigate(['/contracts/ContractsList']);
  }

  //changeId
  ChangeIdContract(input: any) {
    this.idEtudiant = input.target.value;
  }
  //delete
  delete() {
    this.contratService.deleteContrat(this.contrat.idContrat);
  }
  //navigate
  goToContractList() {
    this.route.navigate(['/contracts/ContractsList']);
  }
  //update Only
  updateOnly() {
    this.contratService
      .updateContrat(this.contrat)
      .subscribe(() => console.log('complete'));
    location.reload();
    this.route.navigate(['/contracts/ContractsList']);
  }
}
