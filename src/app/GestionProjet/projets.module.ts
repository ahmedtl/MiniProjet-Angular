import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetsRoutingModule } from './projets-routing.module';
import { GestionprojetComponent } from './gestionprojet.component';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { ListProjetComponent } from './list-projet/list-projet.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
// import { ListTacheComponent } from '../gestiontache/list-tache/list-tache.component';

@NgModule({
    declarations: [
        GestionprojetComponent,
        AddProjetComponent,
        ListProjetComponent
    ],
    imports: [CommonModule, ProjetsRoutingModule, FormsModule, NgxPaginationModule, ReactiveFormsModule]
})
export class ProjetsModule {}
