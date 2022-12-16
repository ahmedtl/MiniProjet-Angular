import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractChartComponent } from './contract-chart/contract-chart.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractsComponent } from './contracts.component';
import { UpdateFormComponent } from './update-form/update-form.component';

const routes: Routes = [{ path: '', component: ContractsComponent },
{ path: 'ContractsList', component: ContractListComponent, children: [
  {
    path: ':id', // child route path
    component: ContractDetailComponent, // child route component that the router renders
  }]},
{ path: 'addContract', component: ContractFormComponent },
{ path: 'updateContract/:id', component: UpdateFormComponent},
{ path: ':id', component: ContractDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
