import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/core/Model/Projet';
import { ProjetService } from 'src/app/core/services/projet.service';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.css'],
  providers: [DatePipe],

})
export class AddProjetComponent implements OnInit {


  constructor(    private datePipe: DatePipe,
    private projetservice : ProjetService, private route: Router,
    private currentRoute: ActivatedRoute,private toastr: ToastrService) { }
    projet:Projet;
    projetList:Projet[];
    action: string;
  currentDate = new Date();
  mindate: any;

  ngOnInit(): void {
    this.mindate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.projet = new Projet();
    
    let id = this.currentRoute.snapshot.params['id'];
    this.projet.idProjet = id;
    if (id != null) {
      //update
      this.action = 'update';
      this.projetservice.get(id).subscribe((data: Projet) => {
        this.projet = data;
      });
      console.log('=================>' + this.projet);
    } else {
      //add
      this.action = 'add new';
      this.projet = new Projet();
    }
    this.projetservice.getAll().subscribe((data: Projet[]) => {
      this.projetList = data;
    });
  }
  saveProjet(): void {
    let data = new Projet()
    data =  {
      idProjet: this.projet.idProjet,
      nomProjet: this.projet.nomProjet,
      theme: this.projet.theme,
      dateDeb: this.projet.dateDeb,
      dateFin: this.projet.dateFin,
      prix:this.projet.prix
    };
    console.log(data);
    this.projetservice.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.route.navigate(['/gestionprojet/ListProjetComponent']);

        },
        error: (e) => console.error(e)
      });
      this.toastr.success("Ajouter avec success!");
  }
  delete() {
    this.projetservice.delete(this.projet.idProjet);
  }
  



}