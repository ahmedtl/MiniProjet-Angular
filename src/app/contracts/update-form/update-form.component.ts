import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contrat } from 'src/app/core/Model/Contrat';
import { ContratService } from 'src/app/core/services/contrat.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css'],
  providers: [DatePipe],
})
export class UpdateFormComponent implements OnInit {
  contratList: Contrat[];
  contrat: Contrat;
  mindate: any;
  currentDate = new Date();
  constructor(
    private datePipe: DatePipe,
    private contratService: ContratService,
    private route: Router,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mindate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.contrat = new Contrat();
    let id = this.currentRoute.snapshot.params['id'];
    if (id != null) {
      //update
      this.contratService.getContratById(id).subscribe((data: Contrat) => {
        this.contrat = data;
      });
    } else {
      //add
      this.contrat = new Contrat();
    }
     //get
     this.contratService.getAllContrat().subscribe((data: Contrat[]) => {
      this.contratList = data;
    });
  }

   //update Only
   updateOnly() {
    this.contratService
      .updateContrat(this.contrat)
      .subscribe(() => console.log('complete'));
    this.route.navigate(['/contracts/ContractsList']);
  }
}
