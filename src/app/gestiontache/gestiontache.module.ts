import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TachesRoutingModule } from './gestiontache-routing.module';
import { GestiontacheComponent } from './gestiontache.component';
import { AddTacheComponent } from './add-tache/add-tache.component';
import { ListTacheComponent } from './list-tache/list-tache.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    GestiontacheComponent,
    AddTacheComponent,
    ListTacheComponent,
  ],
  imports: [CommonModule, TachesRoutingModule, FormsModule, 
    NgxPaginationModule,
  Ng2SearchPipeModule],
})
export class TachesModule {}
