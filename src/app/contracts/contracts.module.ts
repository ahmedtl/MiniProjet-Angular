import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsComponent } from './contracts.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ContractChartComponent } from './contract-chart/contract-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NotifierModule,NotifierOptions } from 'angular-notifier';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UpdateFormComponent } from './update-form/update-form.component';


const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    ContractsComponent,
    ContractFormComponent,
    ContractDetailComponent,
    ContractListComponent,
    ContractChartComponent,
    UpdateFormComponent,
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatSlideToggleModule
  ],
})
export class ContractsModule {}
