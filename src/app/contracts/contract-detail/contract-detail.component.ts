import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { Contrat } from 'src/app/core/Model/Contrat';
import { ContratService } from 'src/app/core/services/contrat.service';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private contratService: ContratService
  ) {}
  id: number;
  contrat: Contrat;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.contrat = new Contrat();
    this.contratService.getContratById(this.id).subscribe((data: Contrat) => {
      this.contrat = data;
    });
  }
    //generate pdf
    makePDF() {
      let pdf = new jsPDF('p', 'pt', 'a6');
      pdf.html(this.el.nativeElement, {
        callback: (pdf) => {
          pdf.save('contrat.pdf');
        },
      });
    }
}
