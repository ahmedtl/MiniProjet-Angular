import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjetComponent } from './GestionProjet/add-projet/add-projet.component';
import { LoginANDregisterComponent } from './login-andregister/login-andregister.component';
import { HeaderComponent } from './shared/header/header.component';
import { AuthGuard } from './_auth/auth.guard';


const routes: Routes = [
  //{ path:'',redirectTo:'login',pathMatch:'full'},
  { path:'loginandregister',component:LoginANDregisterComponent},
  //{ path:'home',component:HeaderComponent,canActivate: [AuthGuard], data: { roles: ['User'] }},
  //{ path:'admin',component:HeaderComponent,canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  { path:"app-add-projet", component:AddProjetComponent},
  { path: 'contracts', loadChildren: () => import('./contracts/contracts.module').then(m => m.ContractsModule) },
  { path: 'etudiants', loadChildren: () => import('./etudiants/etudiants.module').then(m => m.EtudiantsModule) },
  { path: 'departments', loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule) },
  { path: 'universites', loadChildren: () => import('./universites/universites.module').then(m => m.UniversitesModule) },
  { path: 'gestionprojet', loadChildren: () => import('./GestionProjet/projets.module').then(m => m.ProjetsModule) },
  { path: 'gestiontache', loadChildren: () => import('./gestiontache/gestiontache.module').then(m => m.TachesModule) },
  { path: 'teams', loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule) },
  { path: 'teams/details', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
