import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import jsPDF from 'jspdf';
import { Contrat } from '../../core/Model/Contrat';
import { ContratService } from '../../core/services/contrat.service';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import {
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
} from 'rxjs/operators';
import { EtudiantService } from 'src/app/core/services/etudiant.service';
import { Etudiant } from 'src/app/core/Model/Etudiant';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css'],
})
export class ContractListComponent implements OnInit {
  searchText: any;
  parentData =""
  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15];
  order: boolean = true;
  queryField = new FormControl();
  results$: Observable<any>;
  total = 0;
	private notifier: NotifierService;

  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(private router: Router,
    private contratService: ContratService,
    private fb: FormBuilder,
    notifier: NotifierService,
    public userService: UserService
  ) {this.notifier= notifier}
  contrat: Contrat;
  searchForm: FormGroup;
  contratList: Contrat[];
  nbr: any;
  m = new Date().getMonth() + 1;
  d = new Date();
  ngOnInit(): void {
    console.log(this.m);

    this.contrat = new Contrat();
    //getContracts
    this.contratService.getAllContrat().subscribe((data: Contrat[]) => {
      this.contratList = data;
    });

    this.searchForm = this.fb.group({
      search: new FormControl(),
    });
  }

  //addContract
  add() {
    this.contratService
      .addContrat(this.contrat)
      .subscribe(
        () => (this.contratList = [this.contrat, ...this.contratList])
      );
  }
  //deleteContract
  delete(id: number) {
    if (confirm('Are you sure to delete this Contract!'))
      this.contratService.deleteContrat(id).subscribe((data) => {
        alert('Contract deleted successfully!');
        console.log(data);
        this.contratService.getAllContrat();
        location.reload();
      });
  }

  //generate pdf
  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a5');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('contrat.pdf');
      },
    });
  }
  postList(): void {
    this.contratService.getAllContrat().subscribe((data: Contrat[]) => {
      this.contratList = data;
    });
  }
//pagination
  onTableDataChange(event: any): void {
    this.page = event;
    this.postList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.postList();
  }
//sort by amount
  sort(event: any) {
    switch (event.target.value) {
      case 'Low': {
        this.contratList = this.contratList.sort(
          (low, high) => low.montantContrat - high.montantContrat
        );
        break;
      }

      case 'High': {
        this.contratList = this.contratList.sort(
          (low, high) => high.montantContrat - low.montantContrat
        );
        break;
      }

      default: {
        this.contratList = this.contratList.sort(
          (low, high) => low.montantContrat - high.montantContrat
        );
        break;
      }
    }
    return this.contratList;
  }

  //ddlIsNear
  ContractDateIsNear(id: number) {
    return this.contratService.ContractDateIsNear(id);
  }

  transferData(){
    this.parentData=this.searchText
  }

//notifier 
	/**
	 * Show a notification
	 *
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 */
	public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public GoToStats(){
    this.router.navigateByUrl('contracts');
  }


  public ShowAlert(){
    alert("")
  }
}


