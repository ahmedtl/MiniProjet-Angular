import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { GestionprojetComponent } from './gestionprojet.component';
import { ListProjetComponent } from './list-projet/list-projet.component';


const routes: Routes = [{ path: '', component: GestionprojetComponent },
{ path: 'ListProjetComponent', component: ListProjetComponent },
{ path: 'AddProjetComponent', component: AddProjetComponent },
{ path: '', redirectTo: '/putProjet/', pathMatch: 'full' },
 { path: "projet/putProjet/:id", component: AddProjetComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetsRoutingModule { }
