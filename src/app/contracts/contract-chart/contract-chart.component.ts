import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexDataLabels,
} from 'ng-apexcharts';
import { Contrat } from 'src/app/core/Model/Contrat';
import { Specialite } from 'src/app/core/Model/Specialite';
import { ContratService } from 'src/app/core/services/contrat.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-contract-chart',
  templateUrl: './contract-chart.component.html',
  styleUrls: ['./contract-chart.component.css'],
})
export class ContractChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  contrat: Contrat;
  contratList: Contrat[];
  nbr: any;
  nbr2: any;

  nbr3: any;
  nbr4: any;
  cloud: Specialite.CLOUD;
  reseau: Specialite.RESEAU;
  IA: Specialite.IA;
  SECURITE: Specialite.SECURITE;
  chartSeries: ApexNonAxisChartSeries = [];

  chartDetails: ApexChart = {
    width: 600,
    type: 'donut',
    toolbar: {
      show: true,
    },
  };

  chartLabels = ['CLOUD', 'RESEAU', 'SECURITE', 'IA'];

  chartTitle: ApexTitleSubtitle = {
    text: 'CONTRACTS',
    align: 'center',
  };

  chartDataLabels: ApexDataLabels = {
    enabled: true,
  };
  ngOnInit() {
    this.contratService.getAllContrat().subscribe((data: Contrat[]) => {
      this.contratList = data;
      for (let i = 0; i < this.contratList.length; i++) {
        this.contratService
          .getContractByOption(this.contratList[0].specialite)
          .subscribe((data) => {
            this.nbr = data;
            console.log(this.nbr);
          });

        this.contratService
          .getContractByOption(this.contratList[1].specialite)
          .subscribe((data) => {
            this.nbr2 = data;
            console.log(this.nbr2);
          });
        this.contratService
          .getContractByOption(this.contratList[2].specialite)
          .subscribe((data) => {
            this.nbr3 = data;
          });
        this.contratService
          .getContractByOption(this.contratList[3].specialite)
          .subscribe((data) => {
            this.nbr4 = data;

            this.chartSeries = [this.nbr, this.nbr2, this.nbr3, this.nbr4];
          });
      }
    });
  }
  constructor(private contratService: ContratService) {}
}
