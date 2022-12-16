import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EtudiantsRoutingModule } from './etudiants-routing.module';
import { EtudiantsComponent } from './etudiants.component';
import { ListEtudiantComponent } from './list-etudiant/list-etudiant.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { SearchComponent } from './search/search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    EtudiantsComponent,
    ListEtudiantComponent,
    MyprofileComponent,
    //HeaderComponent,
    ProfileUserComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    EtudiantsRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ]
})
export class EtudiantsModule { }
