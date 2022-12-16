import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_auth/auth.guard';
import { EtudiantsComponent } from './etudiants.component';

import { ListEtudiantComponent } from './list-etudiant/list-etudiant.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';

const routes: Routes = [{ path: '', component: EtudiantsComponent },
{ path: 'EtudiantList', component: ListEtudiantComponent ,canActivate: [AuthGuard], data: { roles: ['Admin'] }  },
{ path: 'myProfile', component: MyprofileComponent ,canActivate: [AuthGuard], data: { roles: ['User'] }  },
{ path: 'myprofileUser',component:ProfileUserComponent ,canActivate: [AuthGuard], data: { roles: ['User'] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantsRoutingModule { }
