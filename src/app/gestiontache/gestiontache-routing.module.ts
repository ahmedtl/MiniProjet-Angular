import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTacheComponent } from './add-tache/add-tache.component';
import { GestiontacheComponent } from './gestiontache.component';
import { ListTacheComponent } from './list-tache/list-tache.component';


const routes: Routes = [{ path: '', component: GestiontacheComponent },
{ path: 'ListTacheComponent', component: ListTacheComponent },
{ path: 'AddTacheComponent', component: AddTacheComponent },
{ path: '', redirectTo: '/putProjet/', pathMatch: 'full' },
 { path: "tache/putTache/:id", component:AddTacheComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TachesRoutingModule { }
